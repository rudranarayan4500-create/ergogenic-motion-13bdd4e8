import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

export const AdminGuard = ({ children }: { children: ReactNode }) => {
  const { loading, user, isAdmin } = useAuth();
  
  if (loading) return <div className="container py-20 text-white/60">Loading…</div>;
  
  // Strictly allow access ONLY if officially authenticated as admin via backend
  if (user && isAdmin) {
    return <>{children}</>;
  }

  // Otherwise, kick back to admin login
  return <Navigate to="/admin-login" replace />;
};