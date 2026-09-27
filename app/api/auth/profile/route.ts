import { z } from "zod";
import {
  AuthenticationError,
  requireAuthenticatedUser,
} from "@/lib/auth/server";
import { upsertUserProfile } from "@/lib/db/profiles";

const createProfileSchema = z
  .object({
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().min(1).max(100),
  })
  .strict();

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
