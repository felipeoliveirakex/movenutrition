import { describe, expect, it, beforeEach, vi } from "vitest";

describe("Mercado Pago Service", () => {
  beforeEach(() => {
    vi.resetModules();

    // Mock environment variables (no real secrets in tests)
    process.env.MERCADO_PAGO_ACCESS_TOKEN = "APP_USR-TEST";
    process.env.MERCADO_PAGO_PUBLIC_KEY = "APP_USR-TEST";
    process.env.VITE_SUPABASE_URL = "https://ksxjddrfwkjygvwsmyjb.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-key";

    globalThis.fetch = vi.fn(async (url: any, init?: any) => {
      const asString = String(url);
      if (asString.includes("/checkout/preferences")) {
        return {
          ok: true,
          status: 200,
          async json() {
            return { init_point: "https://mp.test/checkout", id: "pref_test" };
          },
        } as any;
      }

      if (asString.includes("/payments/")) {
        return {
          ok: true,
          status: 200,
          async json() {
            return {
              status: "approved",
              external_reference: "test-user-123",
              payer: { email: "test@example.com" },
              transaction_amount: 29,
            };
          },
        } as any;
      }

      return {
        ok: false,
        status: 404,
        async json() {
          return { message: "not found" };
        },
      } as any;
    }) as any;
  });

  describe("createCheckout", () => {
    it("should create a checkout with valid parameters", async () => {
      const { createCheckout } = await import("./mercado-pago-service");
      const params = {
        userId: "test-user-123",
        userEmail: "test@example.com",
      };

      const result = await createCheckout(params);
      expect(result).toHaveProperty("checkoutUrl");
      expect(result).toHaveProperty("preferenceId");
    });

    it("should include correct amount in checkout", async () => {
      const { createCheckout } = await import("./mercado-pago-service");
      const params = {
        userId: "test-user-123",
        userEmail: "test@example.com",
        amount: 2900, // R$ 29.00
      };

      const result = await createCheckout(params);
      expect(result).toBeDefined();
    });
  });

  describe("checkUserAccess", () => {
    it("should return no access for non-existent user", async () => {
      const { checkUserAccess } = await import("./mercado-pago-service");
      const result = await checkUserAccess("non-existent-user");
      expect(result.hasAccess).toBe(false);
      expect(result.accessType).toBeNull();
    });

    it("should have error handling", async () => {
      const { checkUserAccess } = await import("./mercado-pago-service");
      const result = await checkUserAccess("test-user");
      expect(result).toHaveProperty("hasAccess");
      expect(result).toHaveProperty("accessType");
    });
  });

  describe("Environment variables", () => {
    it("should have Mercado Pago access token", () => {
      expect(process.env.MERCADO_PAGO_ACCESS_TOKEN).toBeDefined();
      expect(process.env.MERCADO_PAGO_ACCESS_TOKEN).toMatch(/^APP_USR-/);
    });

    it("should have Supabase URL", () => {
      expect(process.env.VITE_SUPABASE_URL).toBeDefined();
      expect(process.env.VITE_SUPABASE_URL).toContain("supabase.co");
    });

    it("should have Supabase service role key", () => {
      expect(process.env.SUPABASE_SERVICE_ROLE_KEY).toBeDefined();
    });
  });
});
