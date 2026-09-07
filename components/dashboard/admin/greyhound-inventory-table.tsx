import Link from "next/link";

type GreyhoundStatus = "available" | "matched";

export type GreyhoundInventoryRow = {
  age: string;
  id: string;
  location: string;
  name: string;
  sex: string;
  status: GreyhoundStatus;
};

type GreyhoundInventoryTableProps = {
  greyhounds: GreyhoundInventoryRow[];
};

const statusLabels: Record<GreyhoundStatus, string> = {
  available: "Available",
  matched: "Matched",
};

const statusStyles: Record<GreyhoundStatus, string> = {
  available: "bg-accent/15 text-primary",
  matched: "bg-callout/35 text-primary",
};

export function GreyhoundInventoryTable({
  greyhounds,
}: GreyhoundInventoryTableProps) {
  if (greyhounds.length === 0) {
    return (
      <section className="rounded-md border border-border bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-extrabold tracking-tight text-primary">
          Greyhounds
        </h2>
        <p className="mt-3 text-sm text-foreground/70">
          There are no greyhounds in the inventory yet.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-primary">
          Greyhounds
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          View greyhound availability and profile details for matching decisions.
        </p>
      </div>

      <div className="overflow-hidden rounded-md border border-border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-220 border-collapse text-left text-sm">
            <thead className="bg-surface-app text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
              <tr>
                <th className="border-b border-border px-5 py-4">Greyhound ID</th>
                <th className="border-b border-border px-5 py-4">Name</th>
                <th className="border-b border-border px-5 py-4">Age</th>
                <th className="border-b border-border px-5 py-4">Sex</th>
                <th className="border-b border-border px-5 py-4">Location</th>
                <th className="border-b border-border px-5 py-4">Status</th>
                <th className="border-b border-border px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {greyhounds.map((greyhound) => (
                <tr className="transition hover:bg-surface-app" key={greyhound.id}>
                  <td className="px-5 py-4 font-semibold text-foreground">
                    {greyhound.id}
                  </td>
                  <td className="px-5 py-4 font-semibold text-primary">
                    {greyhound.name}
                  </td>
                  <td className="px-5 py-4 text-foreground/75">
                    {greyhound.age}
                  </td>
                  <td className="px-5 py-4 text-foreground/75">
                    {greyhound.sex}
                  </td>
                  <td className="px-5 py-4 text-foreground/75">
                    {greyhound.location}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusStyles[greyhound.status]}`}>
                      {statusLabels[greyhound.status]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      className="inline-flex h-9 items-center justify-center rounded-sm bg-primary px-4 text-xs font-extrabold text-white transition hover:bg-primary-hover"
                      href={`/admin/greyhounds/${greyhound.id}`}
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
