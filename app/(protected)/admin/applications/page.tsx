import { AdminApplicationsTable, type AdminApplicationRow } from "@/components/dashboard/admin/admin-applications-table";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const adminNavItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/applications", isActive: true, label: "Applications" },
  { href: "/admin/matched-applications", label: "Matched Applications" },
  { href: "/admin/greyhounds", label: "Greyhounds" },
];

const mockApplications: AdminApplicationRow[] = [
  {
    applicantName: "John Doe",
    email: "john.doe@example.com",
    id: "APP-2026-001",
    mobile: "0400 000 000",
    submittedAt: "02 Sep 2026",
  },
  {
    applicantName: "Sarah Nguyen",
    email: "sarah.nguyen@example.com",
    id: "APP-2026-003",
    mobile: "0411 222 333",
    submittedAt: "29 Aug 2026",
  },
  {
    applicantName: "Amelia Brown",
    email: "amelia.brown@example.com",
    id: "APP-2026-004",
    mobile: "0422 333 444",
    submittedAt: "21 Aug 2026",
  },
];

export default function AdminApplicationsPage() {
  return (
    <DashboardShell
      brandSubtitle="Rescue & Adoption Portal"
      brandTitle="GRNSW Admin"
      navItems={adminNavItems}
    >
      <AdminApplicationsTable applications={mockApplications} />
    </DashboardShell>
  );
}
