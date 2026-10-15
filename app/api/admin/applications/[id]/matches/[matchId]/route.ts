import { z } from "zod";
import { ProfileRole } from "@/generated/prisma/enums";
import {
  AuthenticationError,
  requireAuthenticatedUser,
} from "@/lib/auth/server";
import { deleteMatch, MatchConflictError, MatchNotFoundError } from "@/lib/db/matches";
import { findProfileByFirebaseUid } from "@/lib/db/profiles";

type UnmatchRouteContext = {
  params: Promise<{ id: string; matchId: string }>;
};

const idSchema = z.uuid();

export async function DELETE(request: Request, context: UnmatchRouteContext) {
  try {
    const firebaseUser = await requireAuthenticatedUser(request);
    const profile = await findProfileByFirebaseUid(firebaseUser.uid);

    if (profile?.role !== ProfileRole.ADMIN) {
      return Response.json({ error: "Staff access is required." }, { status: 403 });
    }

    const { id: applicationId, matchId } = await context.params;
    if (!idSchema.safeParse(applicationId).success || !idSchema.safeParse(matchId).success) {
      return Response.json({ error: "Invalid application or match ID." }, { status: 400 });
    }

    const result = await deleteMatch(applicationId, matchId);

    return Response.json(
      { applicationId: result.applicationId, greyhoundId: result.greyhoundId },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    if (error instanceof MatchNotFoundError) {
      return Response.json({ error: error.message }, { status: 404 });
    }
    if (error instanceof MatchConflictError) {
      return Response.json({ error: error.message }, { status: 409 });
    }

    console.error("Failed to unmatch application:", error);
    return Response.json(
      { error: "Could not unmatch the application." },
      { status: 500 },
    );
  }
}
