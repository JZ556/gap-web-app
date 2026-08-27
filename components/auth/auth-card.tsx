import Link from "next/link";
import { Lock, Mail, PawPrint, User } from "lucide-react";

type AuthCardMode = "login" | "register";

type AuthCardProps = {
  mode: AuthCardMode;
};

const tabs = [
  { href: "/login", label: "Login", mode: "login" },
  { href: "/register", label: "Register", mode: "register" },
] as const;

export function AuthCard({ mode }: AuthCardProps) {
  const isLogin = mode === "login";

  return (
    <section className="w-full max-w-md overflow-hidden rounded-lg border border-primary/10 bg-white shadow-[0_10px_35px_rgba(12,52,69,0.16)]">
      <div className="bg-primary px-6 py-8 text-center text-white">
        <Link className="inline-flex items-center justify-center gap-3" href="/">
          <PawPrint aria-hidden="true" className="size-8 text-white" strokeWidth={2.75} />
          <span className="text-2xl font-extrabold tracking-tight">
            Greyhound Racing NSW
          </span>
        </Link>
        <p className="mt-3 text-sm font-bold tracking-[0.16em] text-secondary">
          FIND YOUR BEST FRIEND
        </p>
      </div>

      <div className="grid grid-cols-2 border-b border-border">
        {tabs.map((tab) => {
          const isActive = tab.mode === mode;

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={`border-b-2 px-6 py-4 text-center text-sm font-semibold tracking-[0.08em] transition ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/70 hover:text-primary"
              }`}
              href={tab.href}
              key={tab.mode}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <form className="space-y-6 px-8 py-8">
        {!isLogin ? (
          <label className="block">
            <span className="text-sm font-semibold tracking-[0.08em] text-foreground/80">
              Full Name
            </span>
            <span className="mt-2 flex h-12 items-center gap-3 border border-border bg-white px-4 text-foreground/70 focus-within:border-primary">
              <User aria-hidden="true" className="size-5 shrink-0" />
              <input
                autoComplete="name"
                className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-foreground/50"
                placeholder="Enter your full name"
                type="text"
              />
            </span>
          </label>
        ) : null}

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
            {isLogin ? (
              <Link className="text-xs font-medium text-primary transition hover:text-secondary" href="/forgot-password">
                Forgot password?
              </Link>
            ) : null}
          </span>
          <span className="mt-2 flex h-12 items-center gap-3 border border-border bg-white px-4 text-foreground/70 focus-within:border-primary">
            <Lock aria-hidden="true" className="size-5 shrink-0" />
            <input
              autoComplete={isLogin ? "current-password" : "new-password"}
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-foreground/50"
              placeholder="Enter your password"
              type="password"
            />
          </span>
        </label>

        {!isLogin ? (
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
        ) : null}

        <button className="h-12 w-full rounded-sm bg-primary px-5 text-sm font-extrabold text-white transition hover:bg-primary-hover" type="submit">
          {isLogin ? "Login" : "Create Account"}
        </button>
      </form>
    </section>
  );
}
