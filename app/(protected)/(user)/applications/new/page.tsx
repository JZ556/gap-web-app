import { NewApplicationForm } from "@/components/dashboard/user/new-application-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const userNavItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/applications", label: "Applications" },
  { href: "/applications/new", isActive: true, label: "Submit New Application" },
];

export default function NewApplicationPage() {
  return (
    <DashboardShell
      brandSubtitle="Adoption Portal"
      brandTitle="Greyhound Racing NSW"
      navItems={userNavItems}
    >
      <NewApplicationForm />
    </DashboardShell>
  );
}
