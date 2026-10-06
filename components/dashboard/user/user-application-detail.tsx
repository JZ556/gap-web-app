import Link from "next/link";

type UserApplicationStatus = "PENDING_REVIEW" | "MATCHED";

export type UserApplicationDetailData = {
  additionalComments?: string;
  applicantName: string;
  email: string;
  applicationNumber: string;
  matchedGreyhoundName?: string;
  mobile: string;
  status: UserApplicationStatus;
  submittedAt: string;
};

type UserApplicationDetailProps = {
  application: UserApplicationDetailData;
  onWithdraw?: () => void;
  isWithdrawing?: boolean;
};

const statusLabels: Record<UserApplicationStatus, string> = {
  MATCHED: "Matched",
  PENDING_REVIEW: "Pending Review",
};

const statusStyles: Record<UserApplicationStatus, string> = {
  MATCHED: "bg-accent/15 text-primary",
  PENDING_REVIEW: "bg-callout/35 text-primary",
};

export function UserApplicationDetail({
  application,
  onWithdraw,
  isWithdrawing = false,
}: UserApplicationDetailProps) {
  const canWithdraw = application.status === "PENDING_REVIEW" && onWithdraw;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            className="text-sm font-semibold text-primary transition hover:text-secondary"
            href="/applications"
          >
            Back to applications
          </Link>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-primary">
            Application Detail
          </h2>
        </div>

        {canWithdraw ? (
          <button
            className="h-11 cursor-pointer rounded-sm border border-danger px-5 text-sm font-extrabold text-danger transition hover:bg-danger hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isWithdrawing}
            onClick={onWithdraw}
            type="button"
          >
            {isWithdrawing ? "Withdrawing..." : "Withdraw Application"}
          </button>
        ) : null}
      </div>

      <div className="rounded-md border border-border bg-white shadow-sm">
        <dl className="grid divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="space-y-5 p-6">
            <DetailItem label="Application ID" value={application.applicationNumber} />
            <DetailItem label="Applicant Name" value={application.applicantName} />
            <DetailItem label="Date Submitted" value={application.submittedAt} />
            <div>
              <dt className="text-xs font-extrabold uppercase tracking-[0.12em] text-foreground/60">
                Status
              </dt>
              <dd className="mt-2">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusStyles[application.status]}`}>
                  {statusLabels[application.status]}
                </span>
              </dd>
            </div>
          </div>

          <div className="space-y-5 p-6">
            <DetailItem label="Email" value={application.email} />
            <DetailItem label="Mobile" value={application.mobile} />
            {application.matchedGreyhoundName ? (
              <DetailItem
                label="Matched Greyhound"
                value={application.matchedGreyhoundName}
              />
            ) : null}
          </div>
        </dl>
      </div>

      <div className="rounded-md border border-border bg-white p-6 shadow-sm">
        <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-foreground/60">
          Additional Comments
        </h3>
        <p className="mt-3 text-sm leading-6 text-foreground/75">
          {application.additionalComments || "No additional comments provided."}
        </p>
      </div>
    </section>
  );
}

type DetailItemProps = {
  label: string;
  value: string;
};

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div>
      <dt className="text-xs font-extrabold uppercase tracking-[0.12em] text-foreground/60">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}
