import { AdminDashboardOverviewLoader } from "@/components/dashboard/admin/admin-dashboard-overview-loader";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const adminNavItems = [
  { href: "/admin", isActive: true, label: "Dashboard" },
  { href: "/admin/applications", label: "Unmatched Applications" },
  { href: "/admin/matched-applications", label: "Matched Applications" },
  { href: "/admin/greyhounds", label: "Greyhounds" },
];

export default function AdminDashboardPage() {
  return (
    <DashboardShell
      brandSubtitle="Rescue & Adoption Portal"
      brandTitle="GRNSW Admin"
      navItems={adminNavItems}
    >
      <AdminDashboardOverviewLoader />
    </DashboardShell>
  );
}
