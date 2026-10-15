import { z } from "zod";
import { ProfileRole } from "@/generated/prisma/enums";
import {
  AuthenticationError,
  requireAuthenticatedUser,
} from "@/lib/auth/server";
import { createMatch, MatchConflictError } from "@/lib/db/matches";
import { findProfileByFirebaseUid } from "@/lib/db/profiles";
import { sendMatchNotification } from "@/lib/email/send-match-notification";

type MatchRouteContext = {
  params: Promise<{ id: string }>;
};

const matchInputSchema = z.object({
  greyhoundId: z.uuid(),
});

export async function POST(request: Request, context: MatchRouteContext) {
  try {
    const firebaseUser = await requireAuthenticatedUser(request);
    const profile = await findProfileByFirebaseUid(firebaseUser.uid);

    if (profile?.role !== ProfileRole.ADMIN) {
      return Response.json({ error: "Staff access is required." }, { status: 403 });
    }

    const { id: applicationId } = await context.params;
    if (!z.uuid().safeParse(applicationId).success) {
      return Response.json({ error: "Invalid application ID." }, { status: 400 });
    }

    const body = await request.json().catch(() => null);
    const parsed = matchInputSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: "A valid greyhound ID is required." }, { status: 400 });
    }

    const { match, application } = await createMatch({
      applicationId,
      greyhoundId: parsed.data.greyhoundId,
      matchedByUid: firebaseUser.uid,
    });

    let notification: { status: "sent"; emailId: string } | { status: "failed" };
    try {
      const email = await sendMatchNotification({
        firstName: application.firstName,
        applicationNumber: application.applicationNumber,
      });
      notification = { status: "sent", emailId: email.emailId };
    } catch (error) {
      console.error("Match saved, but notification failed:", error);
      notification = { status: "failed" };
    }

    return Response.json(
      { match, notification },
      { status: 201, headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    if (error instanceof MatchConflictError) {
      return Response.json({ error: error.message }, { status: 409 });
    }

    console.error("Failed to match application:", error);
    return Response.json(
      { error: "Could not match the application." },
      { status: 500 },
    );
  }
}
