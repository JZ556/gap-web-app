import { DashboardShell } from "@/components/layout/dashboard-shell";

const adminNavItems = [
  { href: "/admin", isActive: true, label: "Dashboard" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/matched-applications", label: "Matched Applications" },
  { href: "/admin/greyhounds", label: "Greyhounds" },
];

const metrics = [
  { label: "Total Applications", value: "1,248" },
  { label: "Pending Review", value: "56" },
  { label: "Available Greyhounds", value: "89" },
  { label: "Successful Matches", value: "432" },
];

export default function AdminDashboardPage() {
  return (
    <DashboardShell
      brandSubtitle="Rescue & Adoption Portal"
      brandTitle="GRNSW Admin"
      navItems={adminNavItems}
      userInitials="AD"
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-primary">
            Admin Dashboard
          </h2>
          <p className="mt-2 text-sm text-foreground/70">
            Monitor applications, greyhound availability, and matching activity.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <article
              className="rounded-md border border-border bg-white p-6 text-center shadow-sm"
              key={metric.label}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/65">
                {metric.label}
              </p>
              <p className="mt-4 text-4xl font-extrabold text-primary">
                {metric.value}
              </p>
            </article>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
