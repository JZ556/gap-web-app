"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import {
  UserApplicationsTable,
  type UserApplicationRow,
} from "@/components/dashboard/user/user-applications-table";

type ApplicationsResponse = {
  applications?: UserApplicationRow[];
  error?: string;
};

type LoadState =
  | { status: "loading" }
  | { status: "ready"; applications: UserApplicationRow[] }
  | { status: "error"; message: string; sessionExpired: boolean };

export function UserApplicationsList() {
  const { user } = useAuth();
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    if (!user) return;
    const currentUser = user;

    const controller = new AbortController();
    let sessionExpired = false;

    async function loadApplications() {
      try {
        const idToken = await currentUser.getIdToken();
        const response = await fetch("/api/applications", {
          headers: { Authorization: `Bearer ${idToken}` },
          cache: "no-store",
          signal: controller.signal,
        });
        const result = (await response.json()) as ApplicationsResponse;

        if (!response.ok || !Array.isArray(result.applications)) {
          sessionExpired = response.status === 401;
          throw new Error(
            sessionExpired
              ? "Your session has expired. Please sign in again."
              : result.error || "Could not load your applications.",
          );
        }

        if (!controller.signal.aborted) {
          setLoadState({ status: "ready", applications: result.applications });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          const message = error instanceof Error ? error.message : "Could not load your applications.";
          setLoadState({
            status: "error",
            message,
            sessionExpired,
          });
        }
      }
    }

    void loadApplications();
    return () => controller.abort();
  }, [user, reloadIndex]);

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
          <Link className="mt-4 inline-block text-sm font-semibold text-primary underline" href="/login">
            Sign in
          </Link>
        ) : (
          <button
            className="mt-4 text-sm font-semibold text-primary underline"
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

  return <UserApplicationsTable applications={loadState.applications} />;
}
