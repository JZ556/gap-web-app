import "server-only";

import { ApplicationStatus, GreyhoundStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/db/prisma";

export async function getAdminDashboardMetrics() {
  const [totalApplications, pendingReview, availableGreyhounds, matchedApplications] =
    await Promise.all([
      prisma.application.count(),
      prisma.application.count({
        where: { status: ApplicationStatus.PENDING_REVIEW },
      }),
      prisma.greyhound.count({
        where: { status: GreyhoundStatus.AVAILABLE },
      }),
      prisma.application.count({
        where: {
          status: ApplicationStatus.MATCHED,
          match: { isNot: null },
        },
      }),
    ]);

  return {
    totalApplications,
    pendingReview,
    availableGreyhounds,
    matchedApplications,
  };
}
