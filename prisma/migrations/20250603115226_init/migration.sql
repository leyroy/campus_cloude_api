/*
  Warnings:

  - You are about to drop the column `schoolId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `School` table. All the data in the column will be lost.
  - You are about to drop the `SchoolRequestMetadata` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `country` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `founderName` to the `SchoolProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedByid` to the `SchoolProfile` table without a default value. This is not possible if the table is not empty.
  - Made the column `principalName` on table `SchoolProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `principalBio` on table `SchoolProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ContactMethod" AS ENUM ('EMAIL', 'PHONE', 'IN_PERSON');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'REJECTED', 'PENDING', 'DELETED');

-- DropForeignKey
ALTER TABLE "SchoolRequestMetadata" DROP CONSTRAINT "SchoolRequestMetadata_createdById_fkey";

-- DropForeignKey
ALTER TABLE "SchoolRequestMetadata" DROP CONSTRAINT "SchoolRequestMetadata_schoolId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "schoolId",
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "currentPosition" TEXT,
ADD COLUMN     "educationBackground" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "preferredContactMethod" TEXT NOT NULL DEFAULT 'EMAIL',
ADD COLUMN     "preferredContactTime" TEXT NOT NULL DEFAULT 'MORNING',
ADD COLUMN     "previousPositions" TEXT,
ADD COLUMN     "professionalExperience" TEXT,
ADD COLUMN     "yearsInEducation" INTEGER;

-- AlterTable
ALTER TABLE "School" DROP COLUMN "isActive",
ADD COLUMN     "status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "SchoolProfile" ADD COLUMN     "adminNodte" TEXT,
ADD COLUMN     "founderBio" TEXT,
ADD COLUMN     "founderName" TEXT NOT NULL,
ADD COLUMN     "licenseNumber" TEXT,
ADD COLUMN     "updatedByid" TEXT NOT NULL,
ALTER COLUMN "principalName" SET NOT NULL,
ALTER COLUMN "principalBio" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropTable
DROP TABLE "SchoolRequestMetadata";

-- CreateTable
CREATE TABLE "_SchoolProfileToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SchoolProfileToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SchoolProfileToUser_B_index" ON "_SchoolProfileToUser"("B");

-- AddForeignKey
ALTER TABLE "_SchoolProfileToUser" ADD CONSTRAINT "_SchoolProfileToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "SchoolProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchoolProfileToUser" ADD CONSTRAINT "_SchoolProfileToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
