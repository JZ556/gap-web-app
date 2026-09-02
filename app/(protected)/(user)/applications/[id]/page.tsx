import { notFound } from "next/navigation";
import { UserApplicationDetail, type UserApplicationDetailData } from "@/components/dashboard/user/user-application-detail";
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

const mockApplications: UserApplicationDetailData[] = [
  {
    additionalComments: "We have a quiet home and would love a calm greyhound.",
    applicantName: "John Doe",
    email: "john.doe@example.com",
    id: "APP-2026-001",
    mobile: "0400 000 000",
    status: "unmatched",
    submittedAt: "02 Sep 2026",
  },
  {
    additionalComments: "Happy to meet on weekends if needed.",
    applicantName: "John Doe",
    email: "john.doe@example.com",
    id: "APP-2026-002",
    matchedGreyhoundName: "Luna",
    mobile: "0400 000 000",
    status: "matched",
    submittedAt: "15 Aug 2026",
  },
];

export default async function ApplicationDetailPage({
  params,
}: ApplicationDetailPageProps) {
  const { id } = await params;
  const application = mockApplications.find((item) => item.id === id);

  if (!application) {
    notFound();
  }

  return (
    <DashboardShell
      brandSubtitle="Adoption Portal"
      brandTitle="Greyhound Racing NSW"
      navItems={userNavItems}
    >
      <UserApplicationDetail application={application} />
    </DashboardShell>
  );
}
