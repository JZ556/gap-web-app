import { AdminApplicationDetailLoader } from "@/components/dashboard/admin/admin-application-detail-loader";
import { DashboardShell } from "@/components/layout/dashboard-shell";

type AdminApplicationDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const adminNavItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/applications", isActive: true, label: "Unmatched Applications" },
  { href: "/admin/matched-applications", label: "Matched Applications" },
  { href: "/admin/greyhounds", label: "Greyhounds" },
];

export default async function AdminApplicationDetailPage({
  params,
}: AdminApplicationDetailPageProps) {
  const { id } = await params;

  return (
    <DashboardShell
      brandSubtitle="Rescue & Adoption Portal"
      brandTitle="GRNSW Admin"
      navItems={adminNavItems}
    >
      <AdminApplicationDetailLoader id={id} />
    </DashboardShell>
  );
}
