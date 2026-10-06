import { UserApplicationDetailLoader } from "@/components/dashboard/user/user-application-detail-loader";
import { DashboardShell } from "@/components/layout/dashboard-shell";

type ApplicationDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const userNavItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/applications", isActive: true, label: "Applications" },
  { href: "/applications/new", label: "Submit New Application" },
];

export default async function ApplicationDetailPage({
  params,
}: ApplicationDetailPageProps) {
  const { id } = await params;
  return (
    <DashboardShell
      brandSubtitle="Adoption Portal"
      brandTitle="Greyhound Racing NSW"
      navItems={userNavItems}
    >
      <UserApplicationDetailLoader id={id} />
    </DashboardShell>
  );
}
