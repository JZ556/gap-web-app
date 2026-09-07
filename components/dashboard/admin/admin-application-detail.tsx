import Link from "next/link";
import type { ReactNode } from "react";

export type AdminApplicationDetailData = {
  additionalComments?: string;
  address: string;
  bestCallTime: string;
  childrenUnder15: string;
  consentGiven: boolean;
  email: string;
  firstName: string;
  hasPets: string;
  hasSeriousConviction: string;
  id: string;
  lastName: string;
  mobile: string;
  postcode: string;
  referralSource: string;
  state: string;
  status: "unmatched";
  submittedAt: string;
  suburb: string;
};

export type AvailableGreyhoundOption = {
  age: string;
  id: string;
  location: string;
  name: string;
  sex: string;
};

type AdminApplicationDetailProps = {
  application: AdminApplicationDetailData;
  availableGreyhounds: AvailableGreyhoundOption[];
};

export function AdminApplicationDetail({
  application,
  availableGreyhounds,
}: AdminApplicationDetailProps) {
  const applicantName = `${application.firstName} ${application.lastName}`;

  return (
    <section className="space-y-6">
      <div>
        <Link
          className="text-sm font-semibold text-primary transition hover:text-secondary"
          href="/admin/applications"
        >
          Back to applications
        </Link>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-primary">
          Application Review
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          Review the applicant details, then choose an available greyhound to create a match.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <DetailCard title="Application Summary">
            <DetailItem label="Application ID" value={application.id} />
            <DetailItem label="Applicant Name" value={applicantName} />
            <DetailItem label="Date Submitted" value={application.submittedAt} />
            <DetailItem label="Status" value="Pending Review" />
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

        <aside className="h-fit rounded-md border border-border bg-white p-6 shadow-sm">
          <h3 className="text-xl font-extrabold tracking-tight text-primary">
            Match Greyhound
          </h3>
          <p className="mt-2 text-sm leading-6 text-foreground/70">
            Select an available greyhound. Matching will move this application to matched applications.
          </p>

          <form className="mt-6 space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-primary">
                Available Greyhound
              </span>
              <select
                className="mt-2 h-11 w-full rounded-sm border border-border bg-white px-3 text-sm outline-none transition focus:border-primary"
                defaultValue=""
                name="greyhoundId"
                required
              >
                <option disabled value="">
                  Select a greyhound
                </option>
                {availableGreyhounds.map((greyhound) => (
                  <option key={greyhound.id} value={greyhound.id}>
                    {greyhound.name} - {greyhound.sex}, {greyhound.age} - {greyhound.location}
                  </option>
                ))}
              </select>
            </label>

            <button
              className="h-11 w-full rounded-sm bg-primary px-5 text-sm font-extrabold text-white transition hover:bg-primary-hover"
              type="submit"
            >
              Match Application
            </button>
          </form>
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
