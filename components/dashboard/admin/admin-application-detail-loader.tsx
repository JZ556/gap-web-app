"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import {
  AdminApplicationDetail,
  type AdminApplicationDetailData,
  type AvailableGreyhoundOption,
} from "@/components/dashboard/admin/admin-application-detail";

type ApplicationResponse = {
  application?: {
    id: string;
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
  };
  error?: string;
};

type GreyhoundsResponse = {
  greyhounds?: {
    id: string;
    name: string;
    ageYears: number;
    ageMonths: number;
    sex: "MALE" | "FEMALE";
    location: string;
  }[];
  error?: string;
};

type LoadState =
  | { status: "loading" }
  | {
      status: "ready";
      application: AdminApplicationDetailData;
      availableGreyhounds: AvailableGreyhoundOption[];
      greyhoundLoadError?: string;
    }
  | { status: "not-found" }
  | { status: "error"; message: string; sessionExpired: boolean };

type AdminApplicationDetailLoaderProps = {
  id: string;
};

const submittedDateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function AdminApplicationDetailLoader({ id }: AdminApplicationDetailLoaderProps) {
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
        const options = {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store" as const,
          signal: controller.signal,
        };
        const [applicationResponse, greyhoundsResponse] = await Promise.all([
          fetch(`/api/admin/applications/${encodeURIComponent(id)}`, options),
          fetch("/api/admin/greyhounds?status=available", options),
        ]);
        const [applicationResult, greyhoundsResult] = await Promise.all([
          applicationResponse.json() as Promise<ApplicationResponse>,
          greyhoundsResponse.json() as Promise<GreyhoundsResponse>,
        ]);

        if (controller.signal.aborted) return;
        if (applicationResponse.status === 404) {
          setLoadState({ status: "not-found" });
          return;
        }
        const sessionExpired = applicationResponse.status === 401 || greyhoundsResponse.status === 401;
        if (!applicationResponse.ok || !applicationResult.application || sessionExpired ||
            greyhoundsResponse.status === 403) {
          setLoadState({
            status: "error",
            sessionExpired,
            message: sessionExpired
              ? "Your session has expired. Please sign in again."
              : applicationResult.error || greyhoundsResult.error || "Could not load this application.",
          });
          return;
        }

        const application = applicationResult.application;
        const availableGreyhounds = greyhoundsResponse.ok && Array.isArray(greyhoundsResult.greyhounds)
          ? greyhoundsResult.greyhounds.map((greyhound) => ({
              id: greyhound.id,
              name: greyhound.name,
              sex: greyhound.sex === "MALE" ? "Male" : "Female",
              age: `${greyhound.ageYears} ${greyhound.ageYears === 1 ? "year" : "years"}` +
                (greyhound.ageMonths ? ` ${greyhound.ageMonths} ${greyhound.ageMonths === 1 ? "month" : "months"}` : ""),
              location: greyhound.location,
            }))
          : [];

        setLoadState({
          status: "ready",
          application: {
            id: application.id,
            applicationNumber: application.applicationNumber,
            firstName: application.firstName,
            lastName: application.lastName,
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
            submittedAt: submittedDateFormatter.format(new Date(application.submittedAt)),
          },
          availableGreyhounds,
          greyhoundLoadError: greyhoundsResponse.ok && Array.isArray(greyhoundsResult.greyhounds)
            ? undefined
            : greyhoundsResult.error || "Available greyhounds could not be loaded.",
        });
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadState({
            status: "error",
            sessionExpired: false,
            message: error instanceof Error ? error.message : "Could not load this application.",
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
        Loading application...
      </section>
    );
  }

  if (loadState.status === "not-found") {
    return (
      <section className="space-y-3" role="alert">
        <h2 className="text-xl font-bold text-primary">Pending application not found</h2>
        <Link className="text-sm font-semibold text-primary underline" href="/admin/applications">
          Back to applications
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

  return (
    <AdminApplicationDetail
      application={loadState.application}
      availableGreyhounds={loadState.availableGreyhounds}
      greyhoundLoadError={loadState.greyhoundLoadError}
    />
  );
}
