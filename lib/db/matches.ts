import "server-only";

import { Prisma } from "@/generated/prisma/client";
import { ApplicationStatus, GreyhoundStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/db/prisma";

export class MatchConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MatchConflictError";
  }
}

export class MatchNotFoundError extends Error {
  constructor() {
    super("Match not found for this application.");
    this.name = "MatchNotFoundError";
  }
}

type CreateMatchInput = {
  applicationId: string;
  greyhoundId: string;
  matchedByUid: string;
};

export async function createMatch({
  applicationId,
  greyhoundId,
  matchedByUid,
}: CreateMatchInput) {
  try {
    return await prisma.$transaction(async (tx) => {
      const applicationUpdate = await tx.application.updateMany({
        where: { id: applicationId, status: ApplicationStatus.PENDING_REVIEW },
        data: { status: ApplicationStatus.MATCHED },
      });
      if (applicationUpdate.count !== 1) {
        throw new MatchConflictError("This application is no longer pending review.");
      }

      const greyhoundUpdate = await tx.greyhound.updateMany({
        where: { id: greyhoundId, status: GreyhoundStatus.AVAILABLE },
        data: { status: GreyhoundStatus.MATCHED },
      });
      if (greyhoundUpdate.count !== 1) {
        throw new MatchConflictError("This greyhound is no longer available.");
      }

      const match = await tx.match.create({
        data: { applicationId, greyhoundId, matchedByUid },
      });
      const application = await tx.application.findUniqueOrThrow({
        where: { id: applicationId },
        select: { firstName: true, applicationNumber: true },
      });

      return { match, application };
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new MatchConflictError("This application or greyhound is already matched.");
    }
    throw error;
  }
}

export function deleteMatch(applicationId: string, matchId: string) {
  return prisma.$transaction(async (tx) => {
    const match = await tx.match.findFirst({
      where: { id: matchId, applicationId },
      select: { greyhoundId: true },
    });
    if (!match) {
      throw new MatchNotFoundError();
    }

    const deletion = await tx.match.deleteMany({
      where: { id: matchId, applicationId },
    });
    if (deletion.count !== 1) {
      throw new MatchConflictError("This match has already been removed.");
    }

    const applicationUpdate = await tx.application.updateMany({
      where: { id: applicationId, status: ApplicationStatus.MATCHED },
      data: { status: ApplicationStatus.PENDING_REVIEW },
    });
    const greyhoundUpdate = await tx.greyhound.updateMany({
      where: { id: match.greyhoundId, status: GreyhoundStatus.MATCHED },
      data: { status: GreyhoundStatus.AVAILABLE },
    });
    if (applicationUpdate.count !== 1 || greyhoundUpdate.count !== 1) {
      throw new MatchConflictError("The application or greyhound status has changed.");
    }

    return { applicationId, greyhoundId: match.greyhoundId };
  });
}
