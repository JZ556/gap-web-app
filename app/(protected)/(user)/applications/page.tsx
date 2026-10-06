import { UserApplicationsList } from "@/components/dashboard/user/user-applications-list";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const userNavItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/applications", isActive: true, label: "Applications" },
  { href: "/applications/new", label: "Submit New Application" },
];

export default function UserApplicationsPage() {
  return (
    <DashboardShell
      brandSubtitle="Adoption Portal"
      brandTitle="Greyhound Racing NSW"
      navItems={userNavItems}
    >
      <UserApplicationsList />
    </DashboardShell>
  );
}
