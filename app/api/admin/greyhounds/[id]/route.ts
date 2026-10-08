import { z } from "zod";
import { ProfileRole } from "@/generated/prisma/enums";
import {
  AuthenticationError,
  requireAuthenticatedUser,
} from "@/lib/auth/server";
import { findGreyhoundForAdmin } from "@/lib/db/greyhounds";
import { findProfileByFirebaseUid } from "@/lib/db/profiles";

type GreyhoundRouteContext = {
  params: Promise<{ id: string }>;
};

const greyhoundIdSchema = z.uuid();

export async function GET(request: Request, context: GreyhoundRouteContext) {
  try {
    const firebaseUser = await requireAuthenticatedUser(request);
    const profile = await findProfileByFirebaseUid(firebaseUser.uid);

    if (profile?.role !== ProfileRole.ADMIN) {
      return Response.json({ error: "Staff access is required." }, { status: 403 });
    }

    const { id } = await context.params;
    if (!greyhoundIdSchema.safeParse(id).success) {
      return Response.json({ error: "Invalid greyhound ID." }, { status: 400 });
    }

    const greyhound = await findGreyhoundForAdmin(id);
    if (!greyhound) {
      return Response.json({ error: "Greyhound not found." }, { status: 404 });
    }

    return Response.json(
      { greyhound },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    console.error("Failed to retrieve greyhound:", error);
    return Response.json(
      { error: "Could not retrieve the greyhound." },
      { status: 500 },
    );
  }
}
