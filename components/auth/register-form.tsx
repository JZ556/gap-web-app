"use client";

import { useState, type SubmitEvent } from "react";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { Lock, Mail, User } from "lucide-react";
import { OAuthButton } from "@/components/auth/oauth-button";
import { useAuth } from "@/components/providers/auth-provider";

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!firstName || !lastName) {
      setError("Enter your first and last name.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await register(email, password);
      router.replace("/dashboard");
    } catch (cause) {
      if (cause instanceof FirebaseError) {
        switch (cause.code) {
          case "auth/email-already-in-use":
            setError("An account already exists for this email address.");
            break;
          case "auth/invalid-email":
            setError("Enter a valid email address.");
            break;
          case "auth/weak-password":
            setError("Choose a stronger password.");
            break;
          case "auth/operation-not-allowed":
            setError("Email registration is currently unavailable.");
            break;
          case "auth/network-request-failed":
            setError("Could not connect. Check your connection and try again.");
            break;
          default:
            setError("Could not create your account. Please try again.");
        }
      } else {
        setError("Could not create your account. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <label className="block">
        <span className="text-sm font-semibold tracking-[0.08em] text-foreground/80">
          First Name
        </span>
        <span className="mt-2 flex h-12 items-center gap-3 border border-border bg-white px-4 text-foreground/70 focus-within:border-primary">
          <User aria-hidden="true" className="size-5 shrink-0" />
          <input
            autoComplete="given-name"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-foreground/50"
            name="firstName"
            placeholder="Enter your first name"
            required
            type="text"
          />
        </span>
      </label>

      <label className="block">
        <span className="text-sm font-semibold tracking-[0.08em] text-foreground/80">
          Last Name
        </span>
        <span className="mt-2 flex h-12 items-center gap-3 border border-border bg-white px-4 text-foreground/70 focus-within:border-primary">
          <User aria-hidden="true" className="size-5 shrink-0" />
          <input
            autoComplete="family-name"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-foreground/50"
            name="lastName"
            placeholder="Enter your last name"
            required
            type="text"
          />
        </span>
      </label>

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
        <span className="text-sm font-semibold tracking-[0.08em] text-foreground/80">
          Password
        </span>
        <span className="mt-2 flex h-12 items-center gap-3 border border-border bg-white px-4 text-foreground/70 focus-within:border-primary">
          <Lock aria-hidden="true" className="size-5 shrink-0" />
          <input
            autoComplete="new-password"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-foreground/50"
            minLength={6}
            name="password"
            placeholder="Enter your password"
            required
            type="password"
          />
        </span>
      </label>

      <label className="block">
        <span className="text-sm font-semibold tracking-[0.08em] text-foreground/80">
          Confirm Password
        </span>
        <span className="mt-2 flex h-12 items-center gap-3 border border-border bg-white px-4 text-foreground/70 focus-within:border-primary">
          <Lock aria-hidden="true" className="size-5 shrink-0" />
          <input
            autoComplete="new-password"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-foreground/50"
            minLength={6}
            name="confirmPassword"
            placeholder="Confirm your password"
            required
            type="password"
          />
        </span>
      </label>

      <button className="h-12 w-full rounded-sm bg-primary px-5 text-sm font-extrabold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60" disabled={submitting} type="submit">
        {submitting ? "Creating account..." : "Create Account"}
      </button>

      <div aria-live="polite" role={error ? "alert" : "status"}>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
      </div>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/50">
          or
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-3">
        <OAuthButton label="Sign up with Google" />
        <OAuthButton label="Sign up with Microsoft" />
      </div>
    </form>
  );
}
