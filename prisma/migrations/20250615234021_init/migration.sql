/*
  Warnings:

  - You are about to drop the column `state` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `Plan` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Plan` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the `_PlanToSchool` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `region` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `billingCycle` on the `Plan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BillingCycle" AS ENUM ('MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'CANCELLED', 'PAST_DUE');

-- DropForeignKey
ALTER TABLE "_PlanToSchool" DROP CONSTRAINT "_PlanToSchool_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlanToSchool" DROP CONSTRAINT "_PlanToSchool_B_fkey";

-- DropIndex
DROP INDEX "Plan_code_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "state",
DROP COLUMN "zipCode",
ADD COLUMN     "region" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "code",
DROP COLUMN "currency",
DROP COLUMN "description",
DROP COLUMN "features",
ADD COLUMN     "schoolId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "price" SET DATA TYPE INTEGER,
DROP COLUMN "billingCycle",
ADD COLUMN     "billingCycle" "BillingCycle" NOT NULL;

-- DropTable
DROP TABLE "_PlanToSchool";

-- CreateTable
CREATE TABLE "PlanFeature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL,
    "metadata" JSONB,
    "planId" TEXT NOT NULL,

    CONSTRAINT "PlanFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanLimits" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "maxStudents" INTEGER NOT NULL,
    "maxTeachers" INTEGER NOT NULL,
    "maxClasses" INTEGER NOT NULL,
    "maxDepartments" INTEGER NOT NULL,
    "maxSubjects" INTEGER NOT NULL,
    "maxQuizzes" INTEGER NOT NULL,
    "maxNotifications" INTEGER NOT NULL,
    "maxFileUploadsMb" INTEGER NOT NULL,
    "maxTimetables" INTEGER NOT NULL,

    CONSTRAINT "PlanLimits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL,
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "trialEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlanLimits_planId_key" ON "PlanLimits"("planId");

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanFeature" ADD CONSTRAINT "PlanFeature_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanLimits" ADD CONSTRAINT "PlanLimits_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
