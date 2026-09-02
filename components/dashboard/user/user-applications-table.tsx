import Link from "next/link";

type UserApplicationStatus = "matched" | "unmatched" | "withdrawn";

export type UserApplicationRow = {
  id: string;
  status: UserApplicationStatus;
  submittedAt: string;
};

type UserApplicationsTableProps = {
  applications: UserApplicationRow[];
};

const statusLabels: Record<UserApplicationStatus, string> = {
  matched: "Matched",
  unmatched: "Pending Review",
  withdrawn: "Withdrawn",
};

const statusStyles: Record<UserApplicationStatus, string> = {
  matched: "bg-accent/15 text-primary",
  unmatched: "bg-callout/35 text-primary",
  withdrawn: "bg-surface-muted text-foreground/70",
};

export function UserApplicationsTable({
  applications,
}: UserApplicationsTableProps) {
  if (applications.length === 0) {
    return (
      <section className="rounded-md border border-border bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-extrabold tracking-tight text-primary">
          Applications
        </h2>
        <p className="mt-3 text-sm text-foreground/70">
          You have not submitted an adoption application yet.
        </p>
        <Link
          className="mt-6 inline-flex h-11 items-center justify-center rounded-sm bg-primary px-5 text-sm font-extrabold text-white transition hover:bg-primary-hover"
          href="/applications/new"
        >
          Submit Application
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-primary">
          Applications
        </h2>
      </div>

      <div className="overflow-hidden rounded-md border border-border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-180 border-collapse text-left text-sm">
            <thead className="bg-surface-app text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
              <tr>
                <th className="border-b border-border px-5 py-4">Application ID</th>
                <th className="border-b border-border px-5 py-4">Date Submitted</th>
                <th className="border-b border-border px-5 py-4">Status</th>
                <th className="border-b border-border px-5 py-4 text-right">Enter Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {applications.map((application) => (
                <tr className="transition hover:bg-surface-app" key={application.id}>
                  <td className="px-5 py-4 font-semibold text-foreground">
                    {application.id}
                  </td>
                  <td className="px-5 py-4 text-foreground/75">
                    {application.submittedAt}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusStyles[application.status]}`}>
                      {statusLabels[application.status]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      className="inline-flex h-9 items-center justify-center rounded-sm bg-primary px-4 text-xs font-extrabold text-white transition hover:bg-primary-hover"
                      href={`/applications/${application.id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
