import { DashboardShell } from "@/components/layout/dashboard-shell";
import { UserDashboardOverview } from "@/components/dashboard/user/user-dashboard-overview";

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
      <UserDashboardOverview firstName="John" totalApplications={10} />
    </DashboardShell>
  );
}
