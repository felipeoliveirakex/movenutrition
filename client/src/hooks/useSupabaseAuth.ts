import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          // Handle refresh token errors gracefully
          if (error.message.includes("Refresh Token")) {
            await supabase.auth.signOut();
            setUser(null);
            setError(null);
          } else {
            setError(error.message);
          }
        } else {
          setUser(data.session?.user ?? null);
          setError(null);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Unknown error";
        if (errorMsg.includes("Refresh Token")) {
          await supabase.auth.signOut();
          setUser(null);
          setError(null);
        } else {
          setError(errorMsg);
        }
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        setError(null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      } else {
        setUser(null);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    logout,
  };
}
