import type { ReactNode } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";

type UserLayoutProps = {
  children: ReactNode;
};

export default function UserLayout({ children }: UserLayoutProps) {
  return <ProtectedRoute requiredRole="USER">{children}</ProtectedRoute>;
}
