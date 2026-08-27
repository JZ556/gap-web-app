import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-surface-subtle px-6 py-12">
      <AuthCard mode="login">
        <LoginForm />
      </AuthCard>
    </main>
  );
}
