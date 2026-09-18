"use client";

import { useState, type SubmitEvent } from "react";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import { OAuthButton } from "@/components/auth/oauth-button";
import { useAuth } from "@/components/providers/auth-provider";

type LoginFormProps = {
  destination: "/dashboard" | "/admin";
  showGoogleAuth?: boolean;
};

export function LoginForm({ showGoogleAuth = true }: LoginFormProps) {
  const { login } = useAuth();  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await login(email, password);
      setSuccess(true);
    } catch (cause) {
      if (cause instanceof FirebaseError) {
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
        {success ? <p className="text-sm text-green-700">Signed in successfully.</p> : null}
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
