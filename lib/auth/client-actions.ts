"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type UserCredential,
} from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase/client";

// Let callers handle rejected promises and display errors beside the form.
export function login(email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(firebaseAuth, email.trim(), password);
}

export function register(email: string, password: string): Promise<UserCredential> {
  return createUserWithEmailAndPassword(firebaseAuth, email.trim(), password);
}

export function logout(): Promise<void> {
  return signOut(firebaseAuth);
}
