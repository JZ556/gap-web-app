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
