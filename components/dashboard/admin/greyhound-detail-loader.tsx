"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import {
  GreyhoundDetail,
  type GreyhoundDetailData,
} from "@/components/dashboard/admin/greyhound-detail";

type GreyhoundResponse = {
  greyhound?: {
    id: string;
    name: string;
    ageYears: number;
    ageMonths: number;
    sex: "MALE" | "FEMALE";
    microchipNumber: string;
    location: string;
    description: string;
    medicalNotes: string;
    imageUrl: string;
    status: "AVAILABLE" | "MATCHED";
  };
  error?: string;
};

type LoadState =
  | { status: "loading" }
  | { status: "ready"; greyhound: GreyhoundDetailData }
  | { status: "not-found" }
  | { status: "error"; message: string; sessionExpired: boolean };

type GreyhoundDetailLoaderProps = {
  id: string;
};

export function GreyhoundDetailLoader({ id }: GreyhoundDetailLoaderProps) {
  const { user, loading } = useAuth();
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    if (loading || !user) return;
    const currentUser = user;
    const controller = new AbortController();

    async function loadGreyhound() {
      try {
        const token = await currentUser.getIdToken();
        const response = await fetch(`/api/admin/greyhounds/${encodeURIComponent(id)}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
          signal: controller.signal,
        });
        const result = (await response.json()) as GreyhoundResponse;

        if (controller.signal.aborted) return;
        if (response.status === 404) {
          setLoadState({ status: "not-found" });
          return;
        }
        if (!response.ok || !result.greyhound) {
          const sessionExpired = response.status === 401;
          setLoadState({
            status: "error",
            sessionExpired,
            message: sessionExpired
              ? "Your session has expired. Please sign in again."
              : result.error || "Could not load this greyhound.",
          });
          return;
        }

        const greyhound = result.greyhound;
        setLoadState({
          status: "ready",
          greyhound: {
            id: greyhound.id,
            name: greyhound.name,
            age: `${greyhound.ageYears} ${greyhound.ageYears === 1 ? "year" : "years"}` +
              (greyhound.ageMonths ? ` ${greyhound.ageMonths} ${greyhound.ageMonths === 1 ? "month" : "months"}` : ""),
            sex: greyhound.sex === "MALE" ? "Male" : "Female",
            microchipNumber: greyhound.microchipNumber,
            location: greyhound.location,
            description: greyhound.description,
            medicalNotes: greyhound.medicalNotes,
            imageUrl: greyhound.imageUrl,
            status: greyhound.status,
          },
        });
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadState({
            status: "error",
            sessionExpired: false,
            message: error instanceof Error ? error.message : "Could not load this greyhound.",
          });
        }
      }
    }

    void loadGreyhound();
    return () => controller.abort();
  }, [id, user, loading, reloadIndex]);

  if (!loading && !user) {
    return (
      <section className="rounded-md border border-danger/40 bg-white p-6" role="alert">
        <p className="text-sm font-semibold text-danger">Please sign in to view this greyhound.</p>
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
        Loading greyhound...
      </section>
    );
  }

  if (loadState.status === "not-found") {
    return (
      <section className="space-y-3" role="alert">
        <h2 className="text-xl font-bold text-primary">Greyhound not found</h2>
        <Link className="text-sm font-semibold text-primary underline" href="/admin/greyhounds">
          Back to greyhounds
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

  return <GreyhoundDetail greyhound={loadState.greyhound} />;
}
