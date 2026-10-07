"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { UserDashboardOverview } from "@/components/dashboard/user/user-dashboard-overview";

type ProfileResponse = {
  profile?: { firstName: string };
  error?: string;
};

type ApplicationsResponse = {
  applications?: unknown[];
  error?: string;
};

type LoadState =
  | { status: "loading" }
  | { status: "ready"; firstName: string; totalApplications: number }
  | { status: "error"; message: string; sessionExpired: boolean };

export function UserDashboardLoader() {
  const { user, loading } = useAuth();
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    if (loading || !user) return;
    const currentUser = user;
    const controller = new AbortController();

    async function loadDashboard() {
      try {
        const token = await currentUser.getIdToken();
        const options = {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store" as const,
          signal: controller.signal,
        };
        const [profileResponse, applicationsResponse] = await Promise.all([
          fetch("/api/auth/profile", options),
          fetch("/api/applications", options),
        ]);
        const [profileResult, applicationsResult] = await Promise.all([
          profileResponse.json() as Promise<ProfileResponse>,
          applicationsResponse.json() as Promise<ApplicationsResponse>,
        ]);

        if (controller.signal.aborted) return;

        if (!profileResponse.ok || !applicationsResponse.ok ||
            !profileResult.profile || !Array.isArray(applicationsResult.applications)) {
          const sessionExpired = profileResponse.status === 401 || applicationsResponse.status === 401;
          setLoadState({
            status: "error",
            sessionExpired,
            message: sessionExpired
              ? "Your session has expired. Please sign in again."
              : profileResult.error || applicationsResult.error || "Could not load your dashboard.",
          });
          return;
        }

        setLoadState({
          status: "ready",
          firstName: profileResult.profile.firstName,
          totalApplications: applicationsResult.applications.length,
        });
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadState({
            status: "error",
            sessionExpired: false,
            message: error instanceof Error ? error.message : "Could not load your dashboard.",
          });
        }
      }
    }

    void loadDashboard();
    return () => controller.abort();
  }, [user, loading, reloadIndex]);

  if (!loading && !user) {
    return (
      <section className="rounded-md border border-danger/40 bg-white p-6" role="alert">
        <p className="text-sm font-semibold text-danger">Please sign in to view your dashboard.</p>
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
        Loading dashboard...
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

  return (
    <UserDashboardOverview
      firstName={loadState.firstName}
      totalApplications={loadState.totalApplications}
    />
  );
}
