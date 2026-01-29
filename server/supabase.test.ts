import { describe, expect, it } from "vitest";
import { createClient } from "@supabase/supabase-js";

describe("Supabase Configuration", () => {
  it("should connect to Supabase with valid credentials", async () => {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

    expect(supabaseUrl).toBeDefined();
    expect(supabaseAnonKey).toBeDefined();

    // Create Supabase client
    const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

    // Test connection by fetching auth configuration
    const { data, error } = await supabase.auth.getSession();

    // Should not throw an error - connection is valid
    expect(error).toBeNull();
  });

  it("should have service role key configured", async () => {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    expect(serviceRoleKey).toBeDefined();
    // Service role key is a JWT token
    expect(serviceRoleKey).toMatch(/^eyJ/);
  });

  it("should have valid JWT tokens", async () => {
    const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // JWT tokens should have 3 parts separated by dots
    expect(anonKey?.split(".")).toHaveLength(3);
    expect(serviceRoleKey?.split(".")).toHaveLength(3);
  });
});
