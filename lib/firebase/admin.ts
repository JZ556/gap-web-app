import "server-only";

import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

function requireServerEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required for Firebase Admin.`);
  }

  return value;
}

const firebaseAdminApp =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: cert({
          projectId: requireServerEnv("FIREBASE_PROJECT_ID"),
          clientEmail: requireServerEnv("FIREBASE_CLIENT_EMAIL"),
          privateKey: requireServerEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
        }),
      });

export const firebaseAdminAuth = getAuth(firebaseAdminApp);
