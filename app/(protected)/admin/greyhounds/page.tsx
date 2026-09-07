import {
  GreyhoundInventoryTable,
  type GreyhoundInventoryRow,
} from "@/components/dashboard/admin/greyhound-inventory-table";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const adminNavItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/matched-applications", label: "Matched Applications" },
  { href: "/admin/greyhounds", isActive: true, label: "Greyhounds" },
];

const mockGreyhounds: GreyhoundInventoryRow[] = [
  {
    age: "2 years",
    id: "GH-2026-001",
    location: "Sydney",
    name: "Luna",
    sex: "Female",
    status: "available",
  },
  {
    age: "3 years",
    id: "GH-2026-002",
    location: "Melbourne",
    name: "Barnaby",
    sex: "Male",
    status: "matched",
  },
  {
    age: "4 years",
    id: "GH-2026-003",
    location: "Brisbane",
    name: "Dash",
    sex: "Male",
    status: "available",
  },
  {
    age: "5 years",
    id: "GH-2026-004",
    location: "Western Sydney",
    name: "Maestro",
    sex: "Male",
    status: "available",
  },
];

export default function AdminGreyhoundsPage() {
  return (
    <DashboardShell
      brandSubtitle="Rescue & Adoption Portal"
      brandTitle="GRNSW Admin"
      navItems={adminNavItems}
    >
      <GreyhoundInventoryTable greyhounds={mockGreyhounds} />
    </DashboardShell>
  );
}
