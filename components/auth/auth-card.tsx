import Link from "next/link";
import type { ReactNode } from "react";
import { PawPrint } from "lucide-react";

type AuthCardMode = "login" | "register";

type AuthCardProps = {
  children: ReactNode;
  mode: AuthCardMode;
};

const tabs = [
  { href: "/login", label: "Login", mode: "login" },
  { href: "/register", label: "Register", mode: "register" },
] as const;

export function AuthCard({ children, mode }: AuthCardProps) {
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

      <div className="px-8 py-8">{children}</div>
    </section>
  );
}
