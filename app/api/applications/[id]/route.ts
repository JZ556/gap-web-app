import { z } from "zod";
import { ApplicationStatus, ProfileRole } from "@/generated/prisma/enums";
import {
  AuthenticationError,
  requireAuthenticatedUser,
} from "@/lib/auth/server";
import {
  deletePendingApplication,
  findApplicationForApplicant,
} from "@/lib/db/applications";
import { findProfileByFirebaseUid } from "@/lib/db/profiles";

type ApplicationRouteContext = {
  params: Promise<{ id: string }>;
};

const applicationIdSchema = z.uuid();

export async function GET(request: Request, context: ApplicationRouteContext) {
  try {
    const firebaseUser = await requireAuthenticatedUser(request);
    const profile = await findProfileByFirebaseUid(firebaseUser.uid);

    if (profile?.role !== ProfileRole.USER) {
      return Response.json({ error: "User access is required." }, { status: 403 });
    }

    const { id } = await context.params;

    if (!applicationIdSchema.safeParse(id).success) {
      return Response.json({ error: "Invalid application ID." }, { status: 400 });
    }

    const application = await findApplicationForApplicant(id, firebaseUser.uid);

    if (!application) {
      return Response.json({ error: "Application not found." }, { status: 404 });
    }

    return Response.json(
      { application },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    console.error("Failed to retrieve application:", error);
    return Response.json(
      { error: "Could not retrieve the application." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, context: ApplicationRouteContext) {
  try {
    const firebaseUser = await requireAuthenticatedUser(request);
    const profile = await findProfileByFirebaseUid(firebaseUser.uid);

    if (profile?.role !== ProfileRole.USER) {
      return Response.json({ error: "User access is required." }, { status: 403 });
    }

    const { id } = await context.params;

    if (!applicationIdSchema.safeParse(id).success) {
      return Response.json({ error: "Invalid application ID." }, { status: 400 });
    }

    const application = await findApplicationForApplicant(id, firebaseUser.uid);

    if (!application) {
      return Response.json({ error: "Application not found." }, { status: 404 });
    }

    if (application.status !== ApplicationStatus.PENDING_REVIEW) {
      return Response.json(
        { error: "Only pending applications can be withdrawn." },
        { status: 409 },
      );
    }

    const result = await deletePendingApplication(id, firebaseUser.uid);

    if (result.count === 0) {
      return Response.json(
        { error: "This application can no longer be withdrawn." },
        { status: 409 },
      );
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    console.error("Failed to withdraw application:", error);
    return Response.json(
      { error: "Could not withdraw the application." },
      { status: 500 },
    );
  }
}
