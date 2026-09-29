"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";

type ProfileRole = "USER" | "ADMIN";

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole: ProfileRole;
};

type AuthorizedUser = {
  role: ProfileRole;
  uid: string;
};

function readProfileRole(value: unknown): ProfileRole | null {
  if (typeof value !== "object" || value === null || !("profile" in value)) {
    return null;
  }

  const profile = value.profile;

  if (typeof profile !== "object" || profile === null || !("role" in profile)) {
    return null;
  }

  return profile.role === "USER" || profile.role === "ADMIN" ? profile.role : null;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter();
  const { loading, logout, user } = useAuth();
  const [authorizedUser, setAuthorizedUser] = useState<AuthorizedUser | null>(null);

  useEffect(() => {
    if (loading) return;

    const loginPath = requiredRole === "ADMIN" ? "/staff-login" : "/login";

    if (!user) {
      router.replace(loginPath);
      return;
    }

    const currentUser = user;
    let cancelled = false;

    async function checkAccess() {
      try {
        const idToken = await currentUser.getIdToken();
        const response = await fetch("/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Profile lookup failed.");
        }

        const role = readProfileRole(await response.json());

        if (!role) {
          throw new Error("Profile response was invalid.");
        }

        if (role !== requiredRole) {
          router.replace(role === "ADMIN" ? "/admin" : "/dashboard");
          return;
        }

        if (!cancelled) {
          setAuthorizedUser({ role, uid: currentUser.uid });
        }
      } catch {
        try {
          await logout();
        } finally {
          if (!cancelled) {
            router.replace(loginPath);
          }
        }
      }
    }

    void checkAccess();

    return () => {
      cancelled = true;
    };
  }, [loading, logout, requiredRole, router, user]);

  const accessGranted =
    !loading &&
    user !== null &&
    authorizedUser?.uid === user.uid &&
    authorizedUser.role === requiredRole;

  if (!accessGranted) {
    return (
      <div
        aria-live="polite"
        className="grid min-h-screen place-items-center bg-surface-app text-primary"
        role="status"
      >
        <LoaderCircle aria-hidden="true" className="size-7 animate-spin" />
        <span className="sr-only">Checking account access</span>
      </div>
    );
  }

  return children;
}
