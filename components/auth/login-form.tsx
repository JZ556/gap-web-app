"use client";

import { useState, type SubmitEvent } from "react";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { OAuthButton } from "@/components/auth/oauth-button";
import { useAuth } from "@/components/providers/auth-provider";

type LoginFormProps = {
  destination: "/dashboard" | "/admin";
  showGoogleAuth?: boolean;
};

type ProfileRole = "USER" | "ADMIN";

class LoginFlowError extends Error {}

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

export function LoginForm({ destination, showGoogleAuth = true }: LoginFormProps) {
  const router = useRouter();
  const { login, logout } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    setSubmitting(true);
    setError(null);

    let firebaseSignedIn = false;

    try {
      const credential = await login(email, password);
      firebaseSignedIn = true;

      const idToken = await credential.user.getIdToken();
      const response = await fetch("/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (response.status === 404) {
        throw new LoginFlowError("Your account profile has not been set up.");
      }

      if (!response.ok) {
        throw new LoginFlowError(
          "Could not verify your account access. Please try again.",
        );
      }

      const role = readProfileRole(await response.json());

      if (!role) {
        throw new LoginFlowError("The account profile response was invalid.");
      }

      if (destination === "/admin" && role !== "ADMIN") {
        await logout();
        firebaseSignedIn = false;
        throw new LoginFlowError("This account does not have staff access.");
      }

      router.replace(role === "ADMIN" ? "/admin" : "/dashboard");
    } catch (cause) {
      if (firebaseSignedIn) {
        try {
          await logout();
        } catch {
          // Keep the original login error as the message shown to the user.
        }
      }

      if (cause instanceof LoginFlowError) {
        setError(cause.message);
      } else if (cause instanceof FirebaseError) {
        switch (cause.code) {
          case "auth/invalid-credential":
          case "auth/user-not-found":
          case "auth/wrong-password":
            setError("Incorrect email or password.");
            break;
          case "auth/too-many-requests":
            setError("Too many attempts. Please try again later.");
            break;
          case "auth/network-request-failed":
            setError("Could not connect. Check your connection and try again.");
            break;
          default:
            setError("Could not sign in. Please try again.");
        }
      } else {
        setError("Could not sign in. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <label className="block">
        <span className="text-sm font-semibold tracking-[0.08em] text-foreground/80">
          Email Address
        </span>
        <span className="mt-2 flex h-12 items-center gap-3 border border-border bg-white px-4 text-foreground/70 focus-within:border-primary">
          <Mail aria-hidden="true" className="size-5 shrink-0" />
          <input
            autoComplete="email"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-foreground/50"
            name="email"
            placeholder="Enter your email"
            required
            type="email"
          />
        </span>
      </label>

      <label className="block">
        <span className="flex items-center justify-between gap-4">
          <span className="text-sm font-semibold tracking-[0.08em] text-foreground/80">
            Password
          </span>
          <Link className="text-xs font-medium text-primary transition hover:text-secondary" href="/forgot-password">
            Forgot password?
          </Link>
        </span>
        <span className="mt-2 flex h-12 items-center gap-3 border border-border bg-white px-4 text-foreground/70 focus-within:border-primary">
          <Lock aria-hidden="true" className="size-5 shrink-0" />
          <input
            autoComplete="current-password"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-foreground/50"
            name="password"
            placeholder="Enter your password"
            required
            type="password"
          />
        </span>
      </label>

      <button className="h-12 w-full rounded-sm bg-primary px-5 text-sm font-extrabold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60" disabled={submitting} type="submit">
        {submitting ? "Signing in..." : "Login"}
      </button>

      <div aria-live="polite" role={error ? "alert" : "status"}>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
      </div>

      {showGoogleAuth ? (
        <>
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/50">
              or
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-3">
            <OAuthButton label="Continue with Google" />
            <OAuthButton label="Continue with Microsoft" />
          </div>
        </>
      ) : null}
    </form>
  );
}
