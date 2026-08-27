import Link from "next/link";
import { Lock, Mail } from "lucide-react";

export function LoginForm() {
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
    </form>
  );
}
