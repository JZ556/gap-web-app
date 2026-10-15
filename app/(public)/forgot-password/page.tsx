import Link from "next/link";
import { PawPrint } from "lucide-react";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-surface-subtle px-6 py-12">
      <section className="w-full max-w-md overflow-hidden rounded-lg border border-primary/10 bg-white shadow-[0_10px_35px_rgba(12,52,69,0.16)]">
        <div className="bg-primary px-6 py-8 text-center text-white">
          <Link className="inline-flex items-center justify-center gap-3" href="/">
            <PawPrint aria-hidden="true" className="size-8 text-white" strokeWidth={2.75} />
            <span className="text-2xl font-extrabold tracking-tight">Greyhound Racing NSW</span>
          </Link>
          <p className="mt-3 text-sm font-bold tracking-[0.16em] text-secondary">
            FIND YOUR BEST FRIEND
          </p>
        </div>
        <div className="border-b border-border px-6 py-4 text-center">
          <h1 className="text-sm font-semibold tracking-[0.12em] text-primary">Reset Password</h1>
        </div>
        <div className="px-8 py-8">
          <ForgotPasswordForm />
        </div>
      </section>
    </main>
  );
}
