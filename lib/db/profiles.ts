import "server-only";

import { prisma } from "@/lib/db/prisma";

type UpsertUserProfileInput = {
  email: string;
  firebaseUid: string;
  firstName: string;
  lastName: string;
};

export function findProfileByFirebaseUid(firebaseUid: string) {
  return prisma.profile.findUnique({
    where: { firebaseUid },
  });
}

export function upsertUserProfile({
  email,
  firebaseUid,
  firstName,
  lastName,
}: UpsertUserProfileInput) {
  return prisma.profile.upsert({
    where: { firebaseUid },
    create: {
      email,
      firebaseUid,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    },
    update: {
      email,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    },
  });
}
