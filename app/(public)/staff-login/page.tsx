import { LoginForm } from "@/components/auth/login-form";
import { StaffAuthCard } from "@/components/auth/staff-auth-card";

export default function StaffLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-surface-subtle px-6 py-12">
      <StaffAuthCard>
        <LoginForm />
      </StaffAuthCard>
    </main>
  );
}
