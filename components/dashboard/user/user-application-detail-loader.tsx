"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import {
  UserApplicationDetail,
  type UserApplicationDetailData,
} from "@/components/dashboard/user/user-application-detail";

type ApplicationResponse = {
  application?: {
    applicationNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    additionalComments: string | null;
    status: "PENDING_REVIEW" | "MATCHED";
    submittedAt: string;
  };
  error?: string;
};

type LoadState =
  | { status: "loading" }
  | { status: "ready"; application: UserApplicationDetailData }
  | { status: "error"; message: string; sessionExpired: boolean }
  | { status: "not-found" };

type UserApplicationDetailLoaderProps = {
  id: string;
};

export function UserApplicationDetailLoader({ id }: UserApplicationDetailLoaderProps) {
  const { user, loading } = useAuth();
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    if (loading || !user) return;
    const currentUser = user;

    const controller = new AbortController();

    async function loadApplication() {
      try {
        const token = await currentUser.getIdToken();
        const response = await fetch(`/api/applications/${encodeURIComponent(id)}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
          signal: controller.signal,
        });
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
            message: sessionExpired
              ? "Your session has expired. Please sign in again."
              : result.error || "Could not load this application.",
            sessionExpired,
          });
          return;
        }

        const application = result.application;
        setLoadState({
          status: "ready",
          application: {
            id: application.applicationNumber,
            applicantName: `${application.firstName} ${application.lastName}`,
            email: application.email,
            mobile: application.mobile,
            additionalComments: application.additionalComments || undefined,
            status: application.status === "MATCHED" ? "matched" : "unmatched",
            submittedAt: new Date(application.submittedAt).toLocaleDateString("en-AU", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
          },
        });
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadState({
            status: "error",
            message: error instanceof Error ? error.message : "Could not load this application.",
            sessionExpired: false,
          });
        }
      }
    }

    void loadApplication();
    return () => controller.abort();
  }, [id, user, loading, reloadIndex]);

  if (!loading && !user) {
    return (
      <section className="rounded-md border border-danger/40 bg-white p-6" role="alert">
        <p className="text-sm font-semibold text-danger">Please sign in to view this application.</p>
        <Link className="mt-4 inline-block text-sm font-semibold text-primary underline" href="/login">
          Sign in
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
        <h2 className="text-xl font-bold text-primary">Application not found</h2>
        <Link className="text-sm font-semibold text-primary underline" href="/applications">
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
          <Link className="mt-4 inline-block text-sm font-semibold text-primary underline" href="/login">
            Sign in
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

  return <UserApplicationDetail application={loadState.application} />;
}
