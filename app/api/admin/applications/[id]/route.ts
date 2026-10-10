import { z } from "zod";
import { ProfileRole } from "@/generated/prisma/enums";
import {
  AuthenticationError,
  requireAuthenticatedUser,
} from "@/lib/auth/server";
import { findPendingApplicationForAdmin } from "@/lib/db/admin-applications";
import { findProfileByFirebaseUid } from "@/lib/db/profiles";

type ApplicationRouteContext = {
  params: Promise<{ id: string }>;
};

const applicationIdSchema = z.uuid();

export async function GET(request: Request, context: ApplicationRouteContext) {
  try {
    const firebaseUser = await requireAuthenticatedUser(request);
    const profile = await findProfileByFirebaseUid(firebaseUser.uid);

    if (profile?.role !== ProfileRole.ADMIN) {
      return Response.json({ error: "Staff access is required." }, { status: 403 });
    }

    const { id } = await context.params;
    if (!applicationIdSchema.safeParse(id).success) {
      return Response.json({ error: "Invalid application ID." }, { status: 400 });
    }

    const application = await findPendingApplicationForAdmin(id);
    if (!application) {
      return Response.json({ error: "Pending application not found." }, { status: 404 });
    }

    return Response.json(
      { application },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    console.error("Failed to retrieve pending application:", error);
    return Response.json(
      { error: "Could not retrieve the pending application." },
      { status: 500 },
    );
  }
}
