import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

export const AdminGuard = ({ children }: { children: ReactNode }) => {
  const { loading, user, isAdmin } = useAuth();
  
  // Check if our frontend bypass is active
  const isBypassed = localStorage.getItem("admin_bypass") === "true";

  if (loading) return <div className="container py-20 text-white/60">Loading…</div>;
  
  // Allow access if officially authenticated as admin via backend OR bypassed locally
  if ((user && isAdmin) || isBypassed) {
    return <>{children}</>;
  }

  // Otherwise, kick back to admin login
  return <Navigate to="/admin-login" replace />;
};