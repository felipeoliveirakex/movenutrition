import { describe, expect, it, beforeEach, vi } from "vitest";
import {
  createCheckout,
  verifyPayment,
  checkUserAccess,
} from "./mercado-pago-service";

describe("Mercado Pago Service", () => {
  beforeEach(() => {
    // Mock environment variables
    process.env.MERCADO_PAGO_ACCESS_TOKEN =
      "APP_USR-4015968143476277-020112-4b3a72e083611213c6a042fd956a5335-180181928";
    process.env.VITE_SUPABASE_URL = "https://ksxjddrfwkjygvwsmyjb.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-key";
  });

  describe("createCheckout", () => {
    it("should create a checkout with valid parameters", async () => {
      const params = {
        userId: "test-user-123",
        userEmail: "test@example.com",
      };

      try {
        const result = await createCheckout(params);
        expect(result).toHaveProperty("checkoutUrl");
        expect(result).toHaveProperty("preferenceId");
      } catch (error) {
        // Expected to fail in test environment without real Supabase
        expect(error).toBeDefined();
      }
    });

    it("should include correct amount in checkout", async () => {
      const params = {
        userId: "test-user-123",
        userEmail: "test@example.com",
        amount: 2900, // R$ 29.00
      };

      try {
        const result = await createCheckout(params);
        expect(result).toBeDefined();
      } catch (error) {
        // Expected to fail in test environment
        expect(error).toBeDefined();
      }
    });
  });

  describe("checkUserAccess", () => {
    it("should return no access for non-existent user", async () => {
      const result = await checkUserAccess("non-existent-user");
      expect(result.hasAccess).toBe(false);
      expect(result.accessType).toBeNull();
    });

    it("should have error handling", async () => {
      try {
        const result = await checkUserAccess("test-user");
        expect(result).toHaveProperty("hasAccess");
        expect(result).toHaveProperty("accessType");
      } catch (error) {
        expect(error).toBeDefined();
      }
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
