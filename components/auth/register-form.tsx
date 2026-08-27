import { Lock, Mail, User } from "lucide-react";

export function RegisterForm() {
  return (
    <form className="space-y-6">
      <label className="block">
        <span className="text-sm font-semibold tracking-[0.08em] text-foreground/80">
          First Name
        </span>
        <span className="mt-2 flex h-12 items-center gap-3 border border-border bg-white px-4 text-foreground/70 focus-within:border-primary">
          <User aria-hidden="true" className="size-5 shrink-0" />
          <input
            autoComplete="given-name"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-foreground/50"
            placeholder="Enter your first name"
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
            placeholder="Enter your last name"
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
            placeholder="Enter your email"
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
            placeholder="Enter your password"
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
            placeholder="Confirm your password"
            type="password"
          />
        </span>
      </label>

      <button className="h-12 w-full rounded-sm bg-primary px-5 text-sm font-extrabold text-white transition hover:bg-primary-hover" type="submit">
        Create Account
      </button>
    </form>
  );
}
