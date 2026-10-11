"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import {
  AdminApplicationsTable,
  type AdminApplicationRow,
} from "@/components/dashboard/admin/admin-applications-table";

type PendingApplication = {
  id: string;
  applicationNumber: string;
  firstName: string;
  lastName: string;
  submittedAt: string;
  email: string;
  mobile: string;
};

type ApplicationsResponse = {
  applications?: PendingApplication[];
  error?: string;
};

type LoadState =
  | { status: "loading" }
  | { status: "ready"; applications: AdminApplicationRow[] }
  | { status: "error"; message: string; sessionExpired: boolean };

export function AdminApplicationsLoader() {
  const { user, loading } = useAuth();
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    if (loading || !user) return;
    const currentUser = user;
    const controller = new AbortController();

    async function loadApplications() {
      try {
        const token = await currentUser.getIdToken();
        const response = await fetch("/api/admin/applications", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
          signal: controller.signal,
        });
        const result = (await response.json()) as ApplicationsResponse;

        if (controller.signal.aborted) return;
        if (!response.ok || !Array.isArray(result.applications)) {
          const sessionExpired = response.status === 401;
          setLoadState({
            status: "error",
            sessionExpired,
            message: sessionExpired
              ? "Your session has expired. Please sign in again."
              : result.error || "Could not load pending applications.",
          });
          return;
        }

        setLoadState({
          status: "ready",
          applications: result.applications.map((application) => ({
            id: application.id,
            applicationNumber: application.applicationNumber,
            applicantName: `${application.firstName} ${application.lastName}`,
            submittedAt: application.submittedAt,
            email: application.email,
            mobile: application.mobile,
          })),
        });
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadState({
            status: "error",
            sessionExpired: false,
            message: error instanceof Error ? error.message : "Could not load pending applications.",
          });
        }
      }
    }

    void loadApplications();
    return () => controller.abort();
  }, [user, loading, reloadIndex]);

  if (!loading && !user) {
    return (
      <section className="rounded-md border border-danger/40 bg-white p-6" role="alert">
        <p className="text-sm font-semibold text-danger">Please sign in to view applications.</p>
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
        Loading applications...
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

  return <AdminApplicationsTable applications={loadState.applications} />;
}
