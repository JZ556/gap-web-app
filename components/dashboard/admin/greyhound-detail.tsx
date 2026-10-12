import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type GreyhoundStatus = "AVAILABLE" | "MATCHED";

export type GreyhoundDetailData = {
  age: string;
  description: string;
  id: string;
  imageUrl: string;
  location: string;
  medicalNotes: string;
  microchipNumber: string;
  name: string;
  sex: string;
  status: GreyhoundStatus;
};

type GreyhoundDetailProps = {
  greyhound: GreyhoundDetailData;
};

const statusLabels: Record<GreyhoundStatus, string> = {
  AVAILABLE: "Available",
  MATCHED: "Matched",
};

const statusStyles: Record<GreyhoundStatus, string> = {
  AVAILABLE: "bg-accent/15 text-primary",
  MATCHED: "bg-callout/35 text-primary",
};

export function GreyhoundDetail({ greyhound }: GreyhoundDetailProps) {
  return (
    <section className="space-y-6">
      <div>
        <Link
          className="text-sm font-semibold text-primary transition hover:text-secondary"
          href="/admin/greyhounds"
        >
          Back to greyhounds
        </Link>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-primary">
          Greyhound Detail
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          Review greyhound profile information and current matching availability.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <section className="h-fit overflow-hidden rounded-md border border-border bg-white shadow-sm">
          <div className="relative aspect-4/3 bg-surface-muted">
            {greyhound.imageUrl ? (
              <Image
                alt={`${greyhound.name}, a greyhound in the adoption inventory`}
                className="object-cover"
                fill
                sizes="(max-width: 1280px) 100vw, 360px"
                src={greyhound.imageUrl}
              />
            ) : (
              <div className="grid h-full place-items-center text-sm text-foreground/60">
                No photo available
              </div>
            )}
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-extrabold tracking-tight text-primary">
              {greyhound.name}
            </h3>
            <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusStyles[greyhound.status]}`}>
              {statusLabels[greyhound.status]}
            </span>
          </div>
        </section>

        <div className="space-y-6">
          <DetailCard title="Profile Summary">
            <DetailItem label="Greyhound ID" value={greyhound.id} />
            <DetailItem label="Name" value={greyhound.name} />
            <DetailItem label="Age" value={greyhound.age} />
            <DetailItem label="Sex" value={greyhound.sex} />
            <DetailItem label="Microchip Number" value={greyhound.microchipNumber} />
            <DetailItem label="Location" value={greyhound.location} />
          </DetailCard>

          <div className="rounded-md border border-border bg-white p-6 shadow-sm">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-foreground/60">
              Description
            </h3>
            <p className="mt-3 text-sm leading-6 text-foreground/75">
              {greyhound.description}
            </p>
          </div>

          <section className="rounded-md border border-border bg-white p-6 shadow-sm">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-foreground/60">
              Medical Background
            </h3>
            <p className="mt-4 whitespace-pre-line text-sm leading-6 text-foreground/75">
              {greyhound.medicalNotes}
            </p>
          </section>
        </div>
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
      <dd className="mt-2 break-words text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}
