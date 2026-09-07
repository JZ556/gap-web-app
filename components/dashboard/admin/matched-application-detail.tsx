import Link from "next/link";
import type { ReactNode } from "react";

export type MatchedApplicationDetailData = {
  additionalComments?: string;
  address: string;
  applicantName: string;
  bestCallTime: string;
  childrenUnder15: string;
  consentGiven: boolean;
  email: string;
  greyhoundAge: string;
  greyhoundId: string;
  greyhoundLocation: string;
  greyhoundName: string;
  greyhoundSex: string;
  hasPets: string;
  hasSeriousConviction: string;
  id: string;
  matchedAt: string;
  matchId: string;
  mobile: string;
  postcode: string;
  referralSource: string;
  state: string;
  submittedAt: string;
  suburb: string;
};

type MatchedApplicationDetailProps = {
  application: MatchedApplicationDetailData;
};

export function MatchedApplicationDetail({
  application,
}: MatchedApplicationDetailProps) {
  return (
    <section className="space-y-6">
      <div>
        <Link
          className="text-sm font-semibold text-primary transition hover:text-secondary"
          href="/admin/matched-applications"
        >
          Back to matched applications
        </Link>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-primary">
          Matched Application Detail
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          Review the matched application and unmatch it if the pairing needs to be changed.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <DetailCard title="Application Summary">
            <DetailItem label="Application ID" value={application.id} />
            <DetailItem label="Applicant Name" value={application.applicantName} />
            <DetailItem label="Date Submitted" value={application.submittedAt} />
            <DetailItem label="Status" value="Matched" />
          </DetailCard>

          <DetailCard title="Applicant Details">
            <DetailItem label="Email" value={application.email} />
            <DetailItem label="Mobile" value={application.mobile} />
            <DetailItem label="Best Time To Call" value={application.bestCallTime} />
          </DetailCard>

          <DetailCard title="Address">
            <DetailItem label="Address" value={application.address} />
            <DetailItem label="Suburb" value={application.suburb} />
            <DetailItem label="State" value={application.state} />
            <DetailItem label="Postcode" value={application.postcode} />
          </DetailCard>

          <DetailCard title="Household And Disclosure">
            <DetailItem label="Has Pets" value={application.hasPets} />
            <DetailItem label="Children Under 15" value={application.childrenUnder15} />
            <DetailItem label="Referral Source" value={application.referralSource} />
            <DetailItem label="Serious Criminal Offence" value={application.hasSeriousConviction} />
            <DetailItem label="Consent Given" value={application.consentGiven ? "Yes" : "No"} />
          </DetailCard>

          <div className="rounded-md border border-border bg-white p-6 shadow-sm">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-foreground/60">
              Additional Comments
            </h3>
            <p className="mt-3 text-sm leading-6 text-foreground/75">
              {application.additionalComments || "No additional comments provided."}
            </p>
          </div>
        </div>

        <aside className="h-fit space-y-6">
          <section className="rounded-md border border-border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-extrabold tracking-tight text-primary">
              Match Summary
            </h3>
            <dl className="mt-5 space-y-5">
              <DetailItem label="Match ID" value={application.matchId} />
              <DetailItem label="Matched Date" value={application.matchedAt} />
              <DetailItem label="Greyhound ID" value={application.greyhoundId} />
              <DetailItem label="Greyhound Name" value={application.greyhoundName} />
              <DetailItem
                label="Greyhound Details"
                value={`${application.greyhoundSex}, ${application.greyhoundAge} - ${application.greyhoundLocation}`}
              />
            </dl>
          </section>

          <section className="rounded-md border border-danger/30 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-extrabold tracking-tight text-danger">
              Unmatch Application
            </h3>
            <p className="mt-2 text-sm leading-6 text-foreground/70">
              Unmatching will return this application to the pending list and make the greyhound available again.
            </p>
            <button
              className="mt-6 h-11 w-full rounded-sm border border-danger px-5 text-sm font-extrabold text-danger transition hover:bg-danger hover:text-white"
              type="button"
            >
              Unmatch
            </button>
          </section>
        </aside>
      </div>
    </section>
  );
}

type DetailCardProps = {
  children: ReactNode;
  title: string;
};

function DetailCard({ children, title }: DetailCardProps) {
  return (
    <section className="rounded-md border border-border bg-white p-6 shadow-sm">
      <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-foreground/60">
        {title}
      </h3>
      <dl className="mt-5 grid gap-5 md:grid-cols-2">{children}</dl>
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
