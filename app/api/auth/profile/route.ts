import { z } from "zod";
import {
  AuthenticationError,
  requireAuthenticatedUser,
} from "@/lib/auth/server";
import {
  findProfileByFirebaseUid,
  upsertUserProfile,
} from "@/lib/db/profiles";

const createProfileSchema = z
  .object({
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().min(1).max(100),
  })
  .strict();

export async function GET(request: Request) {
  try {
    const firebaseUser = await requireAuthenticatedUser(request);
    const profile = await findProfileByFirebaseUid(firebaseUser.uid);

    if (!profile) {
      return Response.json(
        { error: "No profile exists for this account." },
        { status: 404 },
      );
    }

    return Response.json({
      profile: {
        email: profile.email,
        firebaseUid: profile.firebaseUid,
        firstName: profile.firstName,
        lastName: profile.lastName,
        role: profile.role,
      },
    });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    console.error("Failed to retrieve user profile:", error);
    return Response.json(
      { error: "Could not retrieve the user profile." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const firebaseUser = await requireAuthenticatedUser(request);

    if (!firebaseUser.email) {
      return Response.json(
        { error: "The authenticated account does not have an email address." },
        { status: 400 },
      );
    }

    const result = createProfileSchema.safeParse(await request.json());

    if (!result.success) {
      return Response.json(
        {
          error: "Invalid profile data.",
          issues: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }

    const profile = await upsertUserProfile({
      email: firebaseUser.email,
      firebaseUid: firebaseUser.uid,
      firstName: result.data.firstName,
      lastName: result.data.lastName,
    });

    return Response.json({ profile });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    if (error instanceof SyntaxError) {
      return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
    }

    console.error("Failed to create user profile:", error);
    return Response.json(
      { error: "Could not create the user profile." },
      { status: 500 },
    );
  }
}
