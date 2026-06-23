import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

export const AdminGuard = ({ children }: { children: ReactNode }) => {
  const { loading, user, isAdmin } = useAuth();
  
  // 1. Check if our local fallback bypass is active
  const isBypassed = localStorage.getItem("admin_bypass") === "true";

  if (loading) return <div className="container py-20 text-white/60">Loading…</div>;
  
  // 2. Allow access if officially authenticated via backend OR bypassed locally
  if ((user && isAdmin) || isBypassed) {
    return <>{children}</>;
  }

  // 3. Otherwise, kick back to admin login
  return <Navigate to="/admin-login" replace />;
};