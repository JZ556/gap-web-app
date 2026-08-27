import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-surface-subtle px-6 py-12">
      <AuthCard mode="register">
        <RegisterForm />
      </AuthCard>
    </main>
  );
}
