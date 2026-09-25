import "server-only";

import type { DecodedIdToken } from "firebase-admin/auth";
import { firebaseAdminAuth } from "@/lib/firebase/admin";

export class AuthenticationError extends Error {
  readonly status = 401;

  constructor(message = "Authentication is required.") {
    super(message);
    this.name = "AuthenticationError";
  }
}

function getBearerToken(request: Request): string {
  const authorization = request.headers.get("authorization");
  const match = authorization?.match(/^Bearer\s+(.+)$/i);
  const token = match?.[1]?.trim();

  if (!token) {
    throw new AuthenticationError();
  }

  return token;
}

export async function requireAuthenticatedUser(
  request: Request,
): Promise<DecodedIdToken> {
  const token = getBearerToken(request);

  try {
    return await firebaseAdminAuth.verifyIdToken(token);
  } catch {
    throw new AuthenticationError("The authentication token is invalid or expired.");
  }
}
