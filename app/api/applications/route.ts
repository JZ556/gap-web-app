import { ProfileRole } from "@/generated/prisma/enums";
import {
  AuthenticationError,
  requireAuthenticatedUser,
} from "@/lib/auth/server";
import {
  createApplication,
  listApplicationsForApplicant,
} from "@/lib/db/applications";
import { findProfileByFirebaseUid } from "@/lib/db/profiles";
import { createApplicationSchema } from "@/lib/validation/application";

export async function GET(request: Request) {
  try {
    const firebaseUser = await requireAuthenticatedUser(request);
    const profile = await findProfileByFirebaseUid(firebaseUser.uid);

    if (profile?.role !== ProfileRole.USER) {
      return Response.json({ error: "User access is required." }, { status: 403 });
    }

    const applications = await listApplicationsForApplicant(firebaseUser.uid);
    return Response.json(
      { applications },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    console.error("Failed to retrieve applications:", error);
    return Response.json(
      { error: "Could not retrieve applications." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const firebaseUser = await requireAuthenticatedUser(request);
    const profile = await findProfileByFirebaseUid(firebaseUser.uid);

    if (profile?.role !== ProfileRole.USER) {
      return Response.json({ error: "User access is required." }, { status: 403 });
    }

    const result = createApplicationSchema.safeParse(await request.json());

    if (!result.success) {
      return Response.json(
        {
          error: "Invalid application data.",
          issues: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }

    const application = await createApplication(firebaseUser.uid, result.data);
    return Response.json({ application }, { status: 201 });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    if (error instanceof SyntaxError) {
      return Response.json(
        { error: "Request body must be valid JSON." },
        { status: 400 },
      );
    }

    console.error("Failed to create application:", error);
    return Response.json(
      { error: "Could not create the application." },
      { status: 500 },
    );
  }
}
