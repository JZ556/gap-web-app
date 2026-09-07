import {
  MatchedApplicationsTable,
  type MatchedApplicationRow,
} from "@/components/dashboard/admin/matched-applications-table";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const adminNavItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/matched-applications", isActive: true, label: "Matched Applications" },
  { href: "/admin/greyhounds", label: "Greyhounds" },
];

const mockMatchedApplications: MatchedApplicationRow[] = [
  {
    applicantName: "Michael Chen",
    email: "michael.chen@example.com",
    greyhoundName: "Luna",
    id: "APP-2026-002",
    matchedAt: "18 Aug 2026",
    mobile: "0433 444 555",
  },
  {
    applicantName: "Priya Shah",
    email: "priya.shah@example.com",
    greyhoundName: "Barnaby",
    id: "APP-2026-005",
    matchedAt: "12 Aug 2026",
    mobile: "0444 555 666",
  },
];

export default function AdminMatchedApplicationsPage() {
  return (
    <DashboardShell
      brandSubtitle="Rescue & Adoption Portal"
      brandTitle="GRNSW Admin"
      navItems={adminNavItems}
    >
      <MatchedApplicationsTable applications={mockMatchedApplications} />
    </DashboardShell>
  );
}
