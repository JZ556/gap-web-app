import { AdminApplicationsLoader } from "@/components/dashboard/admin/admin-applications-loader";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const adminNavItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/applications", isActive: true, label: "Unmatched Applications" },
  { href: "/admin/matched-applications", label: "Matched Applications" },
  { href: "/admin/greyhounds", label: "Greyhounds" },
];

export default function AdminApplicationsPage() {
  return (
    <DashboardShell
      brandSubtitle="Rescue & Adoption Portal"
      brandTitle="GRNSW Admin"
      navItems={adminNavItems}
    >
      <AdminApplicationsLoader />
    </DashboardShell>
  );
}
