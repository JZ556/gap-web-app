import { GreyhoundStatus, ProfileRole } from "@/generated/prisma/enums";
import {
  AuthenticationError,
  requireAuthenticatedUser,
} from "@/lib/auth/server";
import {
  listAvailableGreyhoundsForAdmin,
  listGreyhoundsForAdmin,
} from "@/lib/db/greyhounds";
import { findProfileByFirebaseUid } from "@/lib/db/profiles";

export async function GET(request: Request) {
  try {
    const firebaseUser = await requireAuthenticatedUser(request);
    const profile = await findProfileByFirebaseUid(firebaseUser.uid);

    if (profile?.role !== ProfileRole.ADMIN) {
      return Response.json({ error: "Staff access is required." }, { status: 403 });
    }

    const status = new URL(request.url).searchParams.get("status");
    if (status && status !== "available" && status !== "matched") {
      return Response.json({ error: "Invalid greyhound status." }, { status: 400 });
    }

    const greyhounds = status === "available"
      ? await listAvailableGreyhoundsForAdmin()
      : await listGreyhoundsForAdmin(
          status === "matched" ? GreyhoundStatus.MATCHED : undefined,
        );

    return Response.json(
      { greyhounds },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    console.error("Failed to retrieve greyhounds:", error);
    return Response.json(
      { error: "Could not retrieve greyhounds." },
      { status: 500 },
    );
  }
}
