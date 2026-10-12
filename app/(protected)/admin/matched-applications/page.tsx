import { MatchedApplicationsLoader } from "@/components/dashboard/admin/matched-applications-loader";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const adminNavItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/applications", label: "Unmatched Applications" },
  { href: "/admin/matched-applications", isActive: true, label: "Matched Applications" },
  { href: "/admin/greyhounds", label: "Greyhounds" },
];

export default function AdminMatchedApplicationsPage() {
  return (
    <DashboardShell
      brandSubtitle="Rescue & Adoption Portal"
      brandTitle="GRNSW Admin"
      navItems={adminNavItems}
    >
      <MatchedApplicationsLoader />
    </DashboardShell>
  );
}
