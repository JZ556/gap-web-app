"use client";

import { useState, type SubmitEvent } from "react";
import Link from "next/link";
import { FirebaseError } from "firebase/app";
import { ArrowLeft, Mail } from "lucide-react";
import { requestPasswordReset } from "@/lib/auth/client-actions";

export function ForgotPasswordForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    setSubmitting(true);
    setError(null);

    try {
      await requestPasswordReset(email);
      setSubmitted(true);
    } catch (cause) {
      if (cause instanceof FirebaseError) {
        switch (cause.code) {
          case "auth/user-not-found":
            setSubmitted(true);
            break;
          case "auth/invalid-email":
            setError("Enter a valid email address.");
            break;
          case "auth/too-many-requests":
            setError("Too many requests. Please try again later.");
            break;
          case "auth/network-request-failed":
            setError("Could not connect. Check your connection and try again.");
            break;
          default:
            setError("Could not send a reset link. Please try again.");
        }
      } else {
        setError("Could not send a reset link. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {submitted ? (
        <p className="text-sm leading-6 text-foreground/75" role="status">
          If an account exists for that email address, you will receive a password reset link shortly.
          Check your inbox and spam folder.
        </p>
      ) : (
        <>
          <p className="text-sm leading-6 text-foreground/75">
            Enter your account email and we will send you a password reset link.
          </p>
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
            <button
              className="h-12 w-full cursor-pointer rounded-sm bg-primary px-5 text-sm font-extrabold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
              disabled={submitting}
              type="submit"
            >
              {submitting ? "Sending..." : "Send Reset Link"}
            </button>
            <div aria-live="polite" role={error ? "alert" : "status"}>
              {error ? <p className="text-sm text-red-700">{error}</p> : null}
            </div>
          </form>
        </>
      )}
      <Link className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary" href="/login">
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to login
      </Link>
    </div>
  );
}
