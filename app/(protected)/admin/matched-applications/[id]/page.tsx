import { MatchedApplicationDetailLoader } from "@/components/dashboard/admin/matched-application-detail-loader";
import { DashboardShell } from "@/components/layout/dashboard-shell";

type AdminMatchedApplicationDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const adminNavItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/applications", label: "Unmatched Applications" },
  { href: "/admin/matched-applications", isActive: true, label: "Matched Applications" },
  { href: "/admin/greyhounds", label: "Greyhounds" },
];

export default async function AdminMatchedApplicationDetailPage({
  params,
}: AdminMatchedApplicationDetailPageProps) {
  const { id } = await params;

  return (
    <DashboardShell
      brandSubtitle="Rescue & Adoption Portal"
      brandTitle="GRNSW Admin"
      navItems={adminNavItems}
    >
      <MatchedApplicationDetailLoader id={id} />
    </DashboardShell>
  );
}
