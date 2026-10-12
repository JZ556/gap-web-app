import { GreyhoundInventoryLoader } from "@/components/dashboard/admin/greyhound-inventory-loader";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const adminNavItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/applications", label: "Unmatched Applications" },
  { href: "/admin/matched-applications", label: "Matched Applications" },
  { href: "/admin/greyhounds", isActive: true, label: "Greyhounds" },
];

export default function AdminGreyhoundsPage() {
  return (
    <DashboardShell
      brandSubtitle="Rescue & Adoption Portal"
      brandTitle="GRNSW Admin"
      navItems={adminNavItems}
    >
      <GreyhoundInventoryLoader />
    </DashboardShell>
  );
}
