"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import {
  MatchedApplicationDetail,
  type MatchedApplicationDetailData,
} from "@/components/dashboard/admin/matched-application-detail";

type ApplicationResponse = {
  application?: {
    applicationNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    bestCallTime: string;
    address: string;
    suburb: string;
    state: string;
    postcode: string;
    residenceType: string;
    hasSecureYard: boolean;
    hasPets: boolean;
    petDetails: string | null;
    childrenUnder15: number;
    experience: string;
    referralSource: string;
    hasSeriousConviction: boolean;
    additionalComments: string | null;
    submittedAt: string;
    match: {
      id: string;
      matchedAt: string;
      greyhound: {
        id: string;
        name: string;
        sex: "MALE" | "FEMALE";
        ageYears: number;
        ageMonths: number;
        location: string;
      };
    } | null;
  };
  error?: string;
};

type LoadState =
  | { status: "loading" }
  | { status: "ready"; application: MatchedApplicationDetailData }
  | { status: "not-found" }
  | { status: "error"; message: string; sessionExpired: boolean };

const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function formatAge(years: number, months: number) {
  return `${years} ${years === 1 ? "year" : "years"}` +
    (months ? ` ${months} ${months === 1 ? "month" : "months"}` : "");
}

export function MatchedApplicationDetailLoader({ id }: { id: string }) {
  const { user, loading } = useAuth();
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    if (loading || !user) return;
    const currentUser = user;
    const controller = new AbortController();

    async function loadDetail() {
      try {
        const token = await currentUser.getIdToken();
        const response = await fetch(
          `/api/admin/matched-applications/${encodeURIComponent(id)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
            signal: controller.signal,
          },
        );
        const result = (await response.json()) as ApplicationResponse;

        if (controller.signal.aborted) return;
        if (response.status === 404) {
          setLoadState({ status: "not-found" });
          return;
        }
        if (!response.ok || !result.application) {
          const sessionExpired = response.status === 401;
          setLoadState({
            status: "error",
            sessionExpired,
            message: sessionExpired
              ? "Your session has expired. Please sign in again."
              : result.error || "Could not load this matched application.",
          });
          return;
        }

        const application = result.application;
        if (!application.match) {
          throw new Error("This application is missing its match details.");
        }
        const { greyhound } = application.match;
        setLoadState({
          status: "ready",
          application: {
            applicationNumber: application.applicationNumber,
            applicantName: `${application.firstName} ${application.lastName}`,
            email: application.email,
            mobile: application.mobile,
            bestCallTime: application.bestCallTime,
            address: application.address,
            suburb: application.suburb,
            state: application.state,
            postcode: application.postcode,
            residenceType: application.residenceType,
            hasSecureYard: application.hasSecureYard ? "Yes" : "No",
            hasPets: application.hasPets ? "Yes" : "No",
            petDetails: application.petDetails || undefined,
            childrenUnder15: application.childrenUnder15 === 5 ? "5+" : String(application.childrenUnder15),
            experience: application.experience,
            referralSource: application.referralSource,
            hasSeriousConviction: application.hasSeriousConviction ? "Yes" : "No",
            additionalComments: application.additionalComments || undefined,
            submittedAt: dateFormatter.format(new Date(application.submittedAt)),
            matchId: application.match.id,
            matchedAt: dateFormatter.format(new Date(application.match.matchedAt)),
            greyhoundId: greyhound.id,
            greyhoundName: greyhound.name,
            greyhoundSex: greyhound.sex === "MALE" ? "Male" : "Female",
            greyhoundAge: formatAge(greyhound.ageYears, greyhound.ageMonths),
            greyhoundLocation: greyhound.location,
          },
        });
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadState({
            status: "error",
            sessionExpired: false,
            message: error instanceof Error ? error.message : "Could not load this matched application.",
          });
        }
      }
    }

    void loadDetail();
    return () => controller.abort();
  }, [id, user, loading, reloadIndex]);

  if (!loading && !user) {
    return (
      <section className="rounded-md border border-danger/40 bg-white p-6" role="alert">
        <p className="text-sm font-semibold text-danger">Please sign in to view this application.</p>
        <Link className="mt-4 inline-block text-sm font-semibold text-primary underline" href="/staff-login">
          Staff sign in
        </Link>
      </section>
    );
  }

  if (loadState.status === "loading") {
    return (
      <section className="flex items-center gap-3 text-sm text-foreground/70" role="status">
        <LoaderCircle aria-hidden="true" className="size-5 animate-spin text-primary" />
        Loading matched application...
      </section>
    );
  }

  if (loadState.status === "not-found") {
    return (
      <section className="space-y-3" role="alert">
        <h2 className="text-xl font-bold text-primary">Matched application not found</h2>
        <Link className="text-sm font-semibold text-primary underline" href="/admin/matched-applications">
          Back to matched applications
        </Link>
      </section>
    );
  }

  if (loadState.status === "error") {
    return (
      <section className="rounded-md border border-danger/40 bg-white p-6" role="alert">
        <div className="flex items-start gap-3 text-danger">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <p className="text-sm font-semibold">{loadState.message}</p>
        </div>
        {loadState.sessionExpired ? (
          <Link className="mt-4 inline-block text-sm font-semibold text-primary underline" href="/staff-login">
            Staff sign in
          </Link>
        ) : (
          <button
            className="mt-4 cursor-pointer text-sm font-semibold text-primary underline"
            onClick={() => {
              setLoadState({ status: "loading" });
              setReloadIndex((current) => current + 1);
            }}
            type="button"
          >
            Retry
          </button>
        )}
      </section>
    );
  }

  return <MatchedApplicationDetail application={loadState.application} />;
}
