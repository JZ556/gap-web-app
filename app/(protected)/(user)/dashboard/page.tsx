import { DashboardShell } from "@/components/layout/dashboard-shell";

const userNavItems = [
  { href: "/dashboard", isActive: true, label: "Dashboard" },
  { href: "/applications", label: "Applications" },
  { href: "/applications/new", label: "Submit New Application" },
];

export default function UserDashboardPage() {
  return (
    <DashboardShell
      brandSubtitle="Adoption Portal"
      brandTitle="Greyhound Racing NSW"
      navItems={userNavItems}
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-primary">
            Hi John
          </h2>
          <p className="mt-2 text-sm text-foreground/70">
            Here is an overview of your adoption journey.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-md border border-border bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/65">
              Applications
            </p>
            <p className="mt-4 text-4xl font-extrabold text-primary">1</p>
          </article>
          <article className="rounded-md border border-border bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/65">
              Current Status
            </p>
            <p className="mt-4 text-2xl font-extrabold text-primary">Pending Review</p>
          </article>
          <article className="rounded-md border border-border bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/65">
              Matched Greyhound
            </p>
            <p className="mt-4 text-2xl font-extrabold text-primary">Not Yet Matched</p>
          </article>
        </div>
      </div>
    </DashboardShell>
  );
}
