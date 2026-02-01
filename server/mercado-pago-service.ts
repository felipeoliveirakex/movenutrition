import { createClient } from "@supabase/supabase-js";

const MERCADO_PAGO_API_URL = "https://api.mercadopago.com/v1";
const ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;
const PUBLIC_KEY = process.env.MERCADO_PAGO_PUBLIC_KEY;

interface CreateCheckoutParams {
  userId: string;
  userEmail: string;
  amount?: number;
  description?: string;
}

interface PaymentNotification {
  id: string;
  status: string;
  external_reference: string;
  payer: {
    email: string;
  };
}

/**
 * Create a Mercado Pago payment preference (checkout)
 */
export async function createCheckout(params: CreateCheckoutParams) {
  const {
    userId,
    userEmail,
    amount = 2900, // R$ 29.00 in cents
    description = "Assinatura Move Wellness - 1 mês",
  } = params;

  try {
    const response = await fetch(`${MERCADO_PAGO_API_URL}/checkout/preferences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        items: [
          {
            title: description,
            quantity: 1,
            unit_price: amount / 100, // Convert cents to reais
            currency_id: "BRL",
          },
        ],
        payer: {
          email: userEmail,
          identification: {
            type: "CPF",
            number: "", // Optional - can be collected from user
          },
        },
        back_urls: {
          success: `${process.env.FRONTEND_URL || "https://receitas.movenutrition.com.br"}/payment-success`,
          failure: `${process.env.FRONTEND_URL || "https://receitas.movenutrition.com.br"}/payment-failure`,
          pending: `${process.env.FRONTEND_URL || "https://receitas.movenutrition.com.br"}/payment-pending`,
        },
        external_reference: userId,
        notification_url: `${process.env.SERVER_URL || "https://receitas.movenutrition.com.br"}/api/webhook/mercado-pago`,
        auto_return: "approved",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Mercado Pago API error: ${error.message}`);
    }

    const data = await response.json();

    return {
      checkoutUrl: data.init_point,
      preferenceId: data.id,
    };
  } catch (error) {
    console.error("Error creating Mercado Pago checkout:", error);
    throw error;
  }
}

/**
 * Verify payment status from Mercado Pago
 */
export async function verifyPayment(paymentId: string) {
  try {
    const response = await fetch(
      `${MERCADO_PAGO_API_URL}/payments/${paymentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to verify payment");
    }

    const data = await response.json();

    return {
      status: data.status,
      externalReference: data.external_reference,
      payerEmail: data.payer?.email,
      amount: data.transaction_amount,
    };
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
}

/**
 * Grant access to user after successful payment
 */
export async function grantAccessAfterPayment(
  userId: string,
  paymentId: string,
  accessType: "paid" | "free" = "paid"
) {
  try {
    // Update user metadata in Supabase
    const supabaseClient = createClient(
      process.env.VITE_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabaseClient
      .from("user_access")
      .upsert(
        {
          user_id: userId,
          access_type: accessType,
          payment_id: paymentId,
          granted_at: new Date().toISOString(),
          expires_at:
            accessType === "paid"
              ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
              : null,
        },
        { onConflict: "user_id" }
      );

    if (error) {
      throw new Error(`Failed to grant access: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error granting access:", error);
    throw error;
  }
}

/**
 * Validate access code and grant free access
 */
export async function validateAccessCode(
  userId: string,
  code: string
) {
  try {
    const supabaseClient = createClient(
      process.env.VITE_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Check if code exists and is valid
    const { data: codeData, error: codeError } = await supabaseClient
      .from("access_codes")
      .select("*")
      .eq("code", code.toUpperCase())
      .eq("active", true)
      .single();

    if (codeError || !codeData) {
      throw new Error("Código inválido ou expirado");
    }

    // Check if code has been used
    if (codeData.used_count >= codeData.max_uses) {
      throw new Error("Código já foi utilizado o número máximo de vezes");
    }

    // Grant access to user
    await grantAccessAfterPayment(userId, code, "free");

    // Increment code usage
    await supabaseClient
      .from("access_codes")
      .update({ used_count: codeData.used_count + 1 })
      .eq("id", codeData.id);

    return { success: true, message: "Acesso concedido com sucesso!" };
  } catch (error) {
    console.error("Error validating access code:", error);
    throw error;
  }
}

/**
 * Check if user has access
 */
export async function checkUserAccess(userId: string) {
  try {
    const supabaseClient = createClient(
      process.env.VITE_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabaseClient
      .from("user_access")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      return { hasAccess: false, accessType: null };
    }

    // Check if access has expired
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return { hasAccess: false, accessType: null };
    }

    return {
      hasAccess: true,
      accessType: data.access_type,
      expiresAt: data.expires_at,
    };
  } catch (error) {
    console.error("Error checking user access:", error);
    return { hasAccess: false, accessType: null };
  }
}
