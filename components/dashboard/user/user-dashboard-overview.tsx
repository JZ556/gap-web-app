type UserDashboardOverviewProps = {
  firstName: string;
  totalApplications: number;
};

export function UserDashboardOverview({
  firstName,
  totalApplications,
}: UserDashboardOverviewProps) {
  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-extrabold tracking-tight text-primary">
        Hello {firstName}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-md border border-border bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/65">
            Total Applications
          </p>
          <p className="mt-4 text-4xl font-extrabold text-primary">
            {totalApplications}
          </p>
        </article>
      </div>
    </section>
  );
}
