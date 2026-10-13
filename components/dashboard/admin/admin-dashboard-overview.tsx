export type AdminDashboardMetrics = {
  totalApplications: number;
  pendingReview: number;
  availableGreyhounds: number;
  matchedApplications: number;
};

type AdminDashboardOverviewProps = {
  metrics: AdminDashboardMetrics;
};

const metricLabels: { key: keyof AdminDashboardMetrics; label: string }[] = [
  { key: "totalApplications", label: "Total Applications" },
  { key: "pendingReview", label: "Pending Review" },
  { key: "availableGreyhounds", label: "Available Greyhounds" },
  { key: "matchedApplications", label: "Matched Applications" },
];

export function AdminDashboardOverview({ metrics }: AdminDashboardOverviewProps) {
  return (
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
        {metricLabels.map(({ key, label }) => (
          <article
            className="rounded-md border border-border bg-white p-6 text-center shadow-sm"
            key={key}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/65">
              {label}
            </p>
            <p className="mt-4 text-4xl font-extrabold text-primary">
              {metrics[key].toLocaleString("en-AU")}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
