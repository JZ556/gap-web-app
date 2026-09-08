import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import { OAuthButton } from "@/components/auth/oauth-button";

type LoginFormProps = {
  showGoogleAuth?: boolean;
};

export function LoginForm({ showGoogleAuth = true }: LoginFormProps) {
  return (
    <form className="space-y-6">
      <label className="block">
        <span className="text-sm font-semibold tracking-[0.08em] text-foreground/80">
          Email Address
        </span>
        <span className="mt-2 flex h-12 items-center gap-3 border border-border bg-white px-4 text-foreground/70 focus-within:border-primary">
          <Mail aria-hidden="true" className="size-5 shrink-0" />
          <input
            autoComplete="email"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-foreground/50"
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            type="password"
          />
        </span>
      </label>

      <button className="h-12 w-full rounded-sm bg-primary px-5 text-sm font-extrabold text-white transition hover:bg-primary-hover" type="submit">
        Login
      </button>

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
