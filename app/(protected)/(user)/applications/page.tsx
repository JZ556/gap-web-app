import { UserApplicationsTable, type UserApplicationRow } from "@/components/dashboard/user/user-applications-table";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const userNavItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/applications", isActive: true, label: "Applications" },
  { href: "/applications/new", label: "Submit New Application" },
];

const mockApplications: UserApplicationRow[] = [
  {
    id: "APP-2026-001",
    status: "unmatched",
    submittedAt: "02 Sep 2026",
  },
  {
    id: "APP-2026-002",
    status: "matched",
    submittedAt: "15 Aug 2026",
  },
];

export default function UserApplicationsPage() {
  return (
    <DashboardShell
      brandSubtitle="Adoption Portal"
      brandTitle="Greyhound Racing NSW"
      navItems={userNavItems}
    >
      <UserApplicationsTable applications={mockApplications} />
    </DashboardShell>
  );
}
