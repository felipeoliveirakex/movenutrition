import { describe, expect, it } from "vitest";

describe("Mercado Pago Integration", () => {
  it("should validate Mercado Pago credentials", async () => {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    const publicKey = process.env.MERCADO_PAGO_PUBLIC_KEY;

    expect(accessToken).toBeDefined();
    expect(publicKey).toBeDefined();
    expect(accessToken).toMatch(/^APP_USR-/);
    expect(publicKey).toMatch(/^APP_USR-/);

    // Test API connection
    try {
      const response = await fetch("https://api.mercadopago.com/v1/payments", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Credentials are valid if we got a response (not 401/403)
      expect(response.status).not.toBe(401);
      expect(response.status).not.toBe(403);
    } catch (error) {
      console.error("Failed to connect to Mercado Pago API:", error);
      throw error;
    }
  });
});
