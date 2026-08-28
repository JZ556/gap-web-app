import Link from "next/link";
import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

type StaffAuthCardProps = {
  children: ReactNode;
};

export function StaffAuthCard({ children }: StaffAuthCardProps) {
  return (
    <section className="w-full max-w-md overflow-hidden rounded-lg border border-primary/10 bg-white shadow-[0_10px_35px_rgba(12,52,69,0.16)]">
      <div className="bg-primary px-6 py-8 text-center text-white">
        <Link className="inline-flex items-center justify-center gap-3" href="/">
          <ShieldCheck aria-hidden="true" className="size-8 text-white" strokeWidth={2.5} />
          <span className="text-2xl font-extrabold tracking-tight">
            Staff Portal
          </span>
        </Link>
        <p className="mt-3 text-sm font-bold tracking-[0.16em] text-secondary">
          GREYHOUND RACING NSW
        </p>
      </div>

      <div className="border-b border-border px-6 py-4 text-center">
        <h1 className="text-sm font-semibold tracking-[0.12em] text-primary">
          Staff Login
        </h1>
      </div>

      <div className="px-8 py-8">{children}</div>
    </section>
  );
}
