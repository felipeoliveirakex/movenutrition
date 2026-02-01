import express, { Request, Response } from "express";
import {
  createCheckout,
  validateAccessCode,
  grantAccessAfterPayment,
  checkUserAccess,
} from "./mercado-pago-service";

const router = express.Router();

/**
 * POST /api/create-checkout
 * Create a Mercado Pago checkout session
 */
router.post("/create-checkout", async (req: Request, res: Response) => {
  try {
    const { userId, userEmail } = req.body;

    if (!userId || !userEmail) {
      return res.status(400).json({
        message: "userId e userEmail são obrigatórios",
      });
    }

    const checkout = await createCheckout({
      userId,
      userEmail,
    });

    res.json({
      checkoutUrl: checkout.checkoutUrl,
      preferenceId: checkout.preferenceId,
    });
  } catch (error) {
    console.error("Error creating checkout:", error);
    res.status(500).json({
      message: "Erro ao criar checkout",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * POST /api/validate-access-code
 * Validate an access code and grant free access
 */
router.post("/validate-access-code", async (req: Request, res: Response) => {
  try {
    const { code, userId } = req.body;

    if (!code || !userId) {
      return res.status(400).json({
        message: "code e userId são obrigatórios",
      });
    }

    const result = await validateAccessCode(userId, code);

    res.json(result);
  } catch (error) {
    console.error("Error validating access code:", error);
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Erro ao validar código",
    });
  }
});

/**
 * POST /api/webhook/mercado-pago
 * Webhook to handle Mercado Pago payment notifications
 */
router.post("/webhook/mercado-pago", async (req: Request, res: Response) => {
  try {
    const { id, type, data } = req.body;

    // Mercado Pago sends notifications with type "payment"
    if (type === "payment") {
      const paymentId = data.id;

      // Verify the payment with Mercado Pago
      const response = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to verify payment with Mercado Pago");
        return res.status(400).json({ message: "Failed to verify payment" });
      }

      const payment = await response.json();

      // Check if payment was approved
      if (payment.status === "approved") {
        const userId = payment.external_reference;

        // Grant access to user
        await grantAccessAfterPayment(userId, paymentId, "paid");

        console.log(`Payment ${paymentId} approved for user ${userId}`);
      }
    }

    // Always return 200 to acknowledge receipt
    res.json({ message: "Webhook received" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    // Still return 200 to avoid Mercado Pago retrying
    res.json({ message: "Webhook received" });
  }
});

/**
 * GET /api/check-access
 * Check if user has access to the platform
 */
router.get("/check-access/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const access = await checkUserAccess(userId);

    res.json(access);
  } catch (error) {
    console.error("Error checking access:", error);
    res.status(500).json({
      message: "Erro ao verificar acesso",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
