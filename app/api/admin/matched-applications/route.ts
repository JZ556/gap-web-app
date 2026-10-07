import { ProfileRole } from "@/generated/prisma/enums";
import {
  AuthenticationError,
  requireAuthenticatedUser,
} from "@/lib/auth/server";
import { listMatchedApplicationsForAdmin } from "@/lib/db/admin-applications";
import { findProfileByFirebaseUid } from "@/lib/db/profiles";

export async function GET(request: Request) {
  try {
    const firebaseUser = await requireAuthenticatedUser(request);
    const profile = await findProfileByFirebaseUid(firebaseUser.uid);

    if (profile?.role !== ProfileRole.ADMIN) {
      return Response.json({ error: "Staff access is required." }, { status: 403 });
    }

    const applications = await listMatchedApplicationsForAdmin();

    return Response.json(
      { applications },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    console.error("Failed to retrieve matched applications:", error);
    return Response.json(
      { error: "Could not retrieve matched applications." },
      { status: 500 },
    );
  }
}
