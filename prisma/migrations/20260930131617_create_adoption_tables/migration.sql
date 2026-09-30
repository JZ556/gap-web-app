-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING_REVIEW', 'MATCHED');

-- CreateEnum
CREATE TYPE "GreyhoundStatus" AS ENUM ('AVAILABLE', 'MATCHED');

-- CreateEnum
CREATE TYPE "GreyhoundSex" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "applications" (
    "id" UUID NOT NULL,
    "application_number" TEXT NOT NULL,
    "applicant_uid" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "best_call_time" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "residence_type" TEXT NOT NULL,
    "has_secure_yard" BOOLEAN NOT NULL,
    "has_pets" BOOLEAN NOT NULL,
    "pet_details" TEXT,
    "children_under_15" INTEGER NOT NULL,
    "experience" TEXT NOT NULL,
    "referral_source" TEXT NOT NULL,
    "has_serious_conviction" BOOLEAN NOT NULL,
    "additional_comments" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "greyhounds" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "age_years" INTEGER NOT NULL,
    "age_months" INTEGER NOT NULL,
    "sex" "GreyhoundSex" NOT NULL,
    "microchip_number" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "medical_notes" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "status" "GreyhoundStatus" NOT NULL DEFAULT 'AVAILABLE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "greyhounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" UUID NOT NULL,
    "application_id" UUID NOT NULL,
    "greyhound_id" UUID NOT NULL,
    "matched_by_uid" TEXT NOT NULL,
    "matched_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "applications_application_number_key" ON "applications"("application_number");

-- CreateIndex
CREATE INDEX "applications_applicant_uid_idx" ON "applications"("applicant_uid");

-- CreateIndex
CREATE INDEX "applications_status_idx" ON "applications"("status");

-- CreateIndex
CREATE UNIQUE INDEX "greyhounds_microchip_number_key" ON "greyhounds"("microchip_number");

-- CreateIndex
CREATE INDEX "greyhounds_status_idx" ON "greyhounds"("status");

-- CreateIndex
CREATE UNIQUE INDEX "matches_application_id_key" ON "matches"("application_id");

-- CreateIndex
CREATE UNIQUE INDEX "matches_greyhound_id_key" ON "matches"("greyhound_id");

-- CreateIndex
CREATE INDEX "matches_matched_by_uid_idx" ON "matches"("matched_by_uid");

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_applicant_uid_fkey" FOREIGN KEY ("applicant_uid") REFERENCES "profiles"("firebase_uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_greyhound_id_fkey" FOREIGN KEY ("greyhound_id") REFERENCES "greyhounds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_matched_by_uid_fkey" FOREIGN KEY ("matched_by_uid") REFERENCES "profiles"("firebase_uid") ON DELETE RESTRICT ON UPDATE CASCADE;
