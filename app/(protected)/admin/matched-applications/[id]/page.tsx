import { notFound } from "next/navigation";
import {
  MatchedApplicationDetail,
  type MatchedApplicationDetailData,
} from "@/components/dashboard/admin/matched-application-detail";
import { DashboardShell } from "@/components/layout/dashboard-shell";

type AdminMatchedApplicationDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const adminNavItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/matched-applications", isActive: true, label: "Matched Applications" },
  { href: "/admin/greyhounds", label: "Greyhounds" },
];

const mockMatchedApplications: MatchedApplicationDetailData[] = [
  {
    additionalComments: "Happy to meet on weekends if needed.",
    address: "44 Demo Road",
    applicantName: "Michael Chen",
    bestCallTime: "Lunchtime 12noon - 2pm",
    childrenUnder15: "1",
    consentGiven: true,
    email: "michael.chen@example.com",
    greyhoundAge: "2 years",
    greyhoundId: "GH-2026-001",
    greyhoundLocation: "Sydney",
    greyhoundName: "Luna",
    greyhoundSex: "Female",
    hasPets: "No",
    hasSeriousConviction: "No",
    id: "APP-2026-002",
    matchedAt: "18 Aug 2026",
    matchId: "MATCH-2026-001",
    mobile: "0433 444 555",
    postcode: "2042",
    referralSource: "Instagram",
    state: "NSW",
    submittedAt: "15 Aug 2026",
    suburb: "Newtown",
  },
  {
    additionalComments: "Looking for a calm greyhound for an apartment lifestyle.",
    address: "9 Capstone Lane",
    applicantName: "Priya Shah",
    bestCallTime: "Afternoon 2pm - 6pm",
    childrenUnder15: "0",
    consentGiven: true,
    email: "priya.shah@example.com",
    greyhoundAge: "3 years",
    greyhoundId: "GH-2026-002",
    greyhoundLocation: "Melbourne",
    greyhoundName: "Barnaby",
    greyhoundSex: "Male",
    hasPets: "Yes",
    hasSeriousConviction: "No",
    id: "APP-2026-005",
    matchedAt: "12 Aug 2026",
    matchId: "MATCH-2026-002",
    mobile: "0444 555 666",
    postcode: "3000",
    referralSource: "Online Search",
    state: "VIC",
    submittedAt: "09 Aug 2026",
    suburb: "Melbourne",
  },
];

export default async function AdminMatchedApplicationDetailPage({
  params,
}: AdminMatchedApplicationDetailPageProps) {
  const { id } = await params;
  const application = mockMatchedApplications.find((item) => item.id === id);

  if (!application) {
    notFound();
  }

  return (
    <DashboardShell
      brandSubtitle="Rescue & Adoption Portal"
      brandTitle="GRNSW Admin"
      navItems={adminNavItems}
    >
      <MatchedApplicationDetail application={application} />
    </DashboardShell>
  );
}
