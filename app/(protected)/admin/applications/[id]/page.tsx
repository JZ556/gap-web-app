import { notFound } from "next/navigation";
import {
  AdminApplicationDetail,
  type AdminApplicationDetailData,
  type AvailableGreyhoundOption,
} from "@/components/dashboard/admin/admin-application-detail";
import { DashboardShell } from "@/components/layout/dashboard-shell";

type AdminApplicationDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const adminNavItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/applications", isActive: true, label: "Applications" },
  { href: "/admin/matched-applications", label: "Matched Applications" },
  { href: "/admin/greyhounds", label: "Greyhounds" },
];

const mockApplications: AdminApplicationDetailData[] = [
  {
    additionalComments: "We have a quiet home and would love a calm greyhound.",
    address: "12 Demo Street",
    bestCallTime: "Morning 9am - 12noon",
    childrenUnder15: "0",
    consentGiven: true,
    email: "john.doe@example.com",
    firstName: "John",
    hasPets: "No",
    hasSeriousConviction: "No",
    id: "APP-2026-001",
    lastName: "Doe",
    mobile: "0400 000 000",
    postcode: "2000",
    referralSource: "Online Search",
    state: "NSW",
    status: "unmatched",
    submittedAt: "02 Sep 2026",
    suburb: "Sydney",
  },
  {
    additionalComments: "We have a fenced yard and previous large-dog experience.",
    address: "8 Sample Avenue",
    bestCallTime: "Afternoon 2pm - 6pm",
    childrenUnder15: "2",
    consentGiven: true,
    email: "sarah.nguyen@example.com",
    firstName: "Sarah",
    hasPets: "Yes",
    hasSeriousConviction: "No",
    id: "APP-2026-003",
    lastName: "Nguyen",
    mobile: "0411 222 333",
    postcode: "2150",
    referralSource: "A Friend Who Already Adopted",
    state: "NSW",
    status: "unmatched",
    submittedAt: "29 Aug 2026",
    suburb: "Parramatta",
  },
];

const availableGreyhounds: AvailableGreyhoundOption[] = [
  {
    age: "2 years",
    id: "GH-2026-001",
    location: "Sydney",
    name: "Luna",
    sex: "Female",
  },
  {
    age: "3 years",
    id: "GH-2026-002",
    location: "Melbourne",
    name: "Barnaby",
    sex: "Male",
  },
  {
    age: "4 years",
    id: "GH-2026-003",
    location: "Brisbane",
    name: "Dash",
    sex: "Male",
  },
];

export default async function AdminApplicationDetailPage({
  params,
}: AdminApplicationDetailPageProps) {
  const { id } = await params;
  const application = mockApplications.find((item) => item.id === id);

  if (!application) {
    notFound();
  }

  return (
    <DashboardShell
      brandSubtitle="Rescue & Adoption Portal"
      brandTitle="GRNSW Admin"
      navItems={adminNavItems}
    >
      <AdminApplicationDetail
        application={application}
        availableGreyhounds={availableGreyhounds}
      />
    </DashboardShell>
  );
}
