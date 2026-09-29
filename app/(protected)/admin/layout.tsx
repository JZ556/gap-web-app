import type { ReactNode } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <ProtectedRoute requiredRole="ADMIN">{children}</ProtectedRoute>;
}
