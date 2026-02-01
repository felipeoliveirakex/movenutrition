import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useUserAccess } from "@/hooks/useUserAccess";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAccess?: boolean;
}

export function ProtectedRoute({
  children,
  requireAccess = true,
}: ProtectedRouteProps) {
  const { isAuthenticated, loading: authLoading } = useSupabaseAuth();
  const { hasAccess, loading: accessLoading } = useUserAccess();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, authLoading, setLocation]);

  useEffect(() => {
    if (
      requireAccess &&
      !accessLoading &&
      isAuthenticated &&
      !hasAccess
    ) {
      setLocation("/access-gate");
    }
  }, [requireAccess, accessLoading, isAuthenticated, hasAccess, setLocation]);

  if (authLoading || (requireAccess && accessLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  if (!isAuthenticated || (requireAccess && !hasAccess)) {
    return null;
  }

  return <>{children}</>;
}
