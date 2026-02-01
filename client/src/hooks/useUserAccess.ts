import { useEffect, useState } from "react";
import { useSupabaseAuth } from "./useSupabaseAuth";

interface UserAccess {
  hasAccess: boolean;
  accessType: "paid" | "free" | null;
  expiresAt: string | null;
}

export function useUserAccess() {
  const { user } = useSupabaseAuth();
  const [access, setAccess] = useState<UserAccess>({
    hasAccess: false,
    accessType: null,
    expiresAt: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const checkAccess = async () => {
      try {
        const response = await fetch(`/api/check-access/${user.id}`);

        if (!response.ok) {
          throw new Error("Failed to check access");
        }

        const data = await response.json();
        setAccess(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setAccess({
          hasAccess: false,
          accessType: null,
          expiresAt: null,
        });
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [user]);

  return { ...access, loading, error };
}
