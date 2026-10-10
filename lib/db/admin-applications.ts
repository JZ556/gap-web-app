import "server-only";

import { ApplicationStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/db/prisma";

export function listPendingApplicationsForAdmin() {
  return prisma.application.findMany({
    where: { status: ApplicationStatus.PENDING_REVIEW },
    orderBy: { submittedAt: "desc" },
    select: {
      id: true,
      applicationNumber: true,
      firstName: true,
      lastName: true,
      submittedAt: true,
      email: true,
      mobile: true,
    },
  });
}

export function listMatchedApplicationsForAdmin() {
  return prisma.application.findMany({
    where: {
      status: ApplicationStatus.MATCHED,
      match: { isNot: null },
    },
    orderBy: { match: { matchedAt: "desc" } },
    select: {
      id: true,
      applicationNumber: true,
      firstName: true,
      lastName: true,
      email: true,
      mobile: true,
      match: {
        select: {
          matchedAt: true,
          greyhound: { select: { id: true, name: true } },
        },
      },
    },
  });
}

export function findPendingApplicationForAdmin(id: string) {
  return prisma.application.findFirst({
    where: { id, status: ApplicationStatus.PENDING_REVIEW },
  });
}

export function findMatchedApplicationForAdmin(id: string) {
  return prisma.application.findFirst({
    where: {
      id,
      status: ApplicationStatus.MATCHED,
      match: { isNot: null },
    },
    include: {
      match: { include: { greyhound: true } },
    },
  });
}
