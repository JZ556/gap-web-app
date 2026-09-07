import Link from "next/link";

export type MatchedApplicationRow = {
  applicantName: string;
  email: string;
  greyhoundName: string;
  id: string;
  matchedAt: string;
  mobile: string;
};

type MatchedApplicationsTableProps = {
  applications: MatchedApplicationRow[];
};

export function MatchedApplicationsTable({
  applications,
}: MatchedApplicationsTableProps) {
  if (applications.length === 0) {
    return (
      <section className="rounded-md border border-border bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-extrabold tracking-tight text-primary">
          Matched Applications
        </h2>
        <p className="mt-3 text-sm text-foreground/70">
          There are no matched applications yet.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-primary">
          Matched Applications
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          Review applications that have already been matched with a greyhound.
        </p>
      </div>

      <div className="overflow-hidden rounded-md border border-border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-240 border-collapse text-left text-sm">
            <thead className="bg-surface-app text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
              <tr>
                <th className="border-b border-border px-5 py-4">Application ID</th>
                <th className="border-b border-border px-5 py-4">Applicant Name</th>
                <th className="border-b border-border px-5 py-4">Matched Greyhound</th>
                <th className="border-b border-border px-5 py-4">Matched Date</th>
                <th className="border-b border-border px-5 py-4">Email</th>
                <th className="border-b border-border px-5 py-4">Mobile</th>
                <th className="border-b border-border px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {applications.map((application) => (
                <tr className="transition hover:bg-surface-app" key={application.id}>
                  <td className="px-5 py-4 font-semibold text-foreground">
                    {application.id}
                  </td>
                  <td className="px-5 py-4 text-foreground/75">
                    {application.applicantName}
                  </td>
                  <td className="px-5 py-4 font-semibold text-primary">
                    {application.greyhoundName}
                  </td>
                  <td className="px-5 py-4 text-foreground/75">
                    {application.matchedAt}
                  </td>
                  <td className="px-5 py-4 text-foreground/75">
                    {application.email}
                  </td>
                  <td className="px-5 py-4 text-foreground/75">
                    {application.mobile}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      className="inline-flex h-9 items-center justify-center rounded-sm bg-primary px-4 text-xs font-extrabold text-white transition hover:bg-primary-hover"
                      href={`/admin/matched-applications/${application.id}`}
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
