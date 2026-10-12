import { GreyhoundDetailLoader } from "@/components/dashboard/admin/greyhound-detail-loader";
import { DashboardShell } from "@/components/layout/dashboard-shell";

type AdminGreyhoundDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const adminNavItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/applications", label: "Unmatched Applications" },
  { href: "/admin/matched-applications", label: "Matched Applications" },
  { href: "/admin/greyhounds", isActive: true, label: "Greyhounds" },
];

export default async function AdminGreyhoundDetailPage({
  params,
}: AdminGreyhoundDetailPageProps) {
  const { id } = await params;

  return (
    <DashboardShell
      brandSubtitle="Rescue & Adoption Portal"
      brandTitle="GRNSW Admin"
      navItems={adminNavItems}
    >
      <GreyhoundDetailLoader id={id} />
    </DashboardShell>
  );
}
