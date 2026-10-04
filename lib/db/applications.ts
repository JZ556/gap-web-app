import "server-only";

import { randomUUID } from "node:crypto";
import { ApplicationStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/db/prisma";
import type { CreateApplicationInput } from "@/lib/validation/application";

function createApplicationNumber(id: string) {
  const year = new Date().getFullYear();
  const shortId = id.replaceAll("-", "").slice(0, 12).toUpperCase();

  return `APP-${year}-${shortId}`;
}

export function createApplication(
  applicantUid: string,
  application: CreateApplicationInput,
) {
  const id = randomUUID();

  return prisma.application.create({
    data: {
      ...application,
      id,
      applicationNumber: createApplicationNumber(id),
      applicant: {
        connect: { firebaseUid: applicantUid },
      },
    },
  });
}

export function listApplicationsForApplicant(applicantUid: string) {
  return prisma.application.findMany({
    where: { applicantUid },
    orderBy: { submittedAt: "desc" },
  });
}

export function findApplicationForApplicant(id: string, applicantUid: string) {
  return prisma.application.findFirst({
    where: { id, applicantUid },
  });
}

export function deletePendingApplication(id: string, applicantUid: string) {
  return prisma.application.deleteMany({
    where: {
      id,
      applicantUid,
      status: ApplicationStatus.PENDING_REVIEW,
    },
  });
}
