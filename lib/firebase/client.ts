import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

// Load the browser-safe Firebase credentials from .env.local or deployment env vars.
const requiredClientEnv = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
} satisfies Record<string, string | undefined>;

// Fail early with a clear message if a required Firebase value is missing.
const missingClientEnv = Object.entries(requiredClientEnv)
  .filter(([, value]) => !value)
  .map(([key]) => `NEXT_PUBLIC_FIREBASE_${key.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase()}`);

if (missingClientEnv.length > 0) {
  throw new Error(
    `Missing Firebase client environment variables: ${missingClientEnv.join(", ")}`,
  );
}

const firebaseConfig: FirebaseOptions = {
  ...requiredClientEnv,
  // Analytics uses this optional measurement ID when it is enabled later.
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Reuse an existing Firebase app during Next.js hot reload, otherwise initialize one.
export const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
