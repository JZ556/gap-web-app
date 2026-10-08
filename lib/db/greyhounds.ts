import "server-only";

import { GreyhoundStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/db/prisma";

export function listGreyhoundsForAdmin(status?: GreyhoundStatus) {
  return prisma.greyhound.findMany({
    where: status ? { status } : undefined,
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      ageYears: true,
      ageMonths: true,
      sex: true,
      location: true,
      status: true,
    },
  });
}

export function listAvailableGreyhoundsForAdmin() {
  return prisma.greyhound.findMany({
    where: { status: GreyhoundStatus.AVAILABLE },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      ageYears: true,
      ageMonths: true,
      sex: true,
      location: true,
    },
  });
}

export function findGreyhoundForAdmin(id: string) {
  return prisma.greyhound.findUnique({ where: { id } });
}
