"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import {
  AdminDashboardOverview,
  type AdminDashboardMetrics,
} from "@/components/dashboard/admin/admin-dashboard-overview";

type DashboardResponse = {
  metrics?: AdminDashboardMetrics;
  error?: string;
};

type LoadState =
  | { status: "loading" }
  | { status: "ready"; metrics: AdminDashboardMetrics }
  | { status: "error"; message: string; sessionExpired: boolean };

function hasValidMetrics(metrics: AdminDashboardMetrics | undefined): metrics is AdminDashboardMetrics {
  const keys: (keyof AdminDashboardMetrics)[] = [
    "totalApplications",
    "pendingReview",
    "availableGreyhounds",
    "matchedApplications",
  ];

  return metrics !== undefined && keys.every(
    (key) => Number.isInteger(metrics[key]) && metrics[key] >= 0,
  );
}

export function AdminDashboardOverviewLoader() {
  const { user, loading } = useAuth();
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    if (loading || !user) return;
    const currentUser = user;
    const controller = new AbortController();

    async function loadMetrics() {
      try {
        const token = await currentUser.getIdToken();
        const response = await fetch("/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
          signal: controller.signal,
        });
        const result = (await response.json()) as DashboardResponse;

        if (controller.signal.aborted) return;
        if (!response.ok || !hasValidMetrics(result.metrics)) {
          const sessionExpired = response.status === 401;
          setLoadState({
            status: "error",
            sessionExpired,
            message: sessionExpired
              ? "Your session has expired. Please sign in again."
              : result.error || "Could not load dashboard metrics.",
          });
          return;
        }

        setLoadState({ status: "ready", metrics: result.metrics });
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadState({
            status: "error",
            sessionExpired: false,
            message: error instanceof Error ? error.message : "Could not load dashboard metrics.",
          });
        }
      }
    }

    void loadMetrics();
    return () => controller.abort();
  }, [user, loading, reloadIndex]);

  if (!loading && !user) {
    return (
      <section className="rounded-md border border-danger/40 bg-white p-6" role="alert">
        <p className="text-sm font-semibold text-danger">Please sign in to view the dashboard.</p>
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
        Loading dashboard metrics...
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

  return <AdminDashboardOverview metrics={loadState.metrics} />;
}
