import { DashboardShell } from "@/components/layout/dashboard-shell";
import { UserDashboardLoader } from "@/components/dashboard/user/user-dashboard-loader";

const userNavItems = [
  { href: "/dashboard", isActive: true, label: "Dashboard" },
  { href: "/applications", label: "Applications" },
  { href: "/applications/new", label: "Submit New Application" },
];

export default function UserDashboardPage() {
  return (
    <DashboardShell
      brandSubtitle="Adoption Portal"
      brandTitle="Greyhound Racing NSW"
      navItems={userNavItems}
    >
      <UserDashboardLoader />
    </DashboardShell>
  );
}
