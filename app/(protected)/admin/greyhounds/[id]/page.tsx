import { notFound } from "next/navigation";
import { GreyhoundDetail, type GreyhoundDetailData } from "@/components/dashboard/admin/greyhound-detail";
import { DashboardShell } from "@/components/layout/dashboard-shell";

type AdminGreyhoundDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const adminNavItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/matched-applications", label: "Matched Applications" },
  { href: "/admin/greyhounds", isActive: true, label: "Greyhounds" },
];

const mockGreyhounds: GreyhoundDetailData[] = [
  {
    age: "2 years",
    goodWithChildren: "Yes",
    goodWithDogs: "Yes",
    id: "GH-2026-001",
    imageUrl: "/images/stitch-luna.jpg",
    intro: "Luna is a sweet and gentle greyhound who is building confidence in a quiet home environment.",
    location: "Sydney",
    medicalNotes: ["C5 vaccinated", "Desexed", "Microchipped", "Wormed"],
    microchipNumber: "956000000000001",
    name: "Luna",
    sex: "Female",
    status: "available",
    temperament: ["Calm", "Sweet", "Gentle"],
  },
  {
    age: "3 years",
    goodWithChildren: "Yes",
    goodWithDogs: "Selective",
    id: "GH-2026-002",
    imageUrl: "/images/stitch-barnaby.jpg",
    intro: "Barnaby is affectionate, food motivated, and enjoys spending time close to people.",
    location: "Melbourne",
    medicalNotes: ["C5 vaccinated", "Desexed", "Microchipped", "Heartworm tested"],
    microchipNumber: "956000000000002",
    name: "Barnaby",
    sex: "Male",
    status: "matched",
    temperament: ["Affectionate", "Relaxed", "Friendly"],
  },
  {
    age: "4 years",
    goodWithChildren: "Older children preferred",
    goodWithDogs: "Yes",
    id: "GH-2026-003",
    imageUrl: "/images/stitch-dash.jpg",
    intro: "Dash enjoys a quick zoomie, then settles happily into a calm indoor routine.",
    location: "Brisbane",
    medicalNotes: ["C5 vaccinated", "Desexed", "Microchipped", "Flea prevention"],
    microchipNumber: "956000000000003",
    name: "Dash",
    sex: "Male",
    status: "available",
    temperament: ["Playful", "Calm", "Social"],
  },
];

export default async function AdminGreyhoundDetailPage({
  params,
}: AdminGreyhoundDetailPageProps) {
  const { id } = await params;
  const greyhound = mockGreyhounds.find((item) => item.id === id);

  if (!greyhound) {
    notFound();
  }

  return (
    <DashboardShell
      brandSubtitle="Rescue & Adoption Portal"
      brandTitle="GRNSW Admin"
      navItems={adminNavItems}
    >
      <GreyhoundDetail greyhound={greyhound} />
    </DashboardShell>
  );
}
