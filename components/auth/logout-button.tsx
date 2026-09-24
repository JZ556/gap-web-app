"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";

export function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogout() {
    if (signingOut) return;

    setSigningOut(true);
    setError(null);

    try {
      await logout();
      router.replace("/");
    } catch {
      setError("Could not sign out. Please try again.");
      setSigningOut(false);
    }
  }

  return (
    <div>
      <button
        aria-busy={signingOut}
        className="flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-sm px-3 py-2 text-sm font-semibold text-foreground/70 transition hover:bg-surface-app hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
        disabled={signingOut}
        onClick={handleLogout}
        type="button"
      >
        <LogOut aria-hidden="true" className="size-5 shrink-0" />
        <span>{signingOut ? "Signing out..." : "Logout"}</span>
      </button>

      <div aria-live="polite" role={error ? "alert" : "status"}>
        {error ? <p className="mt-2 px-3 text-xs text-red-700">{error}</p> : null}
      </div>
    </div>
  );
}
