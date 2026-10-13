import { ProfileRole } from "@/generated/prisma/enums";
import {
  AuthenticationError,
  requireAuthenticatedUser,
} from "@/lib/auth/server";
import { getAdminDashboardMetrics } from "@/lib/db/admin-dashboard";
import { findProfileByFirebaseUid } from "@/lib/db/profiles";

export async function GET(request: Request) {
  try {
    const firebaseUser = await requireAuthenticatedUser(request);
    const profile = await findProfileByFirebaseUid(firebaseUser.uid);

    if (profile?.role !== ProfileRole.ADMIN) {
      return Response.json({ error: "Staff access is required." }, { status: 403 });
    }

    const metrics = await getAdminDashboardMetrics();

    return Response.json(
      { metrics },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    console.error("Failed to retrieve admin dashboard metrics:", error);
    return Response.json(
      { error: "Could not retrieve dashboard metrics." },
      { status: 500 },
    );
  }
}
 