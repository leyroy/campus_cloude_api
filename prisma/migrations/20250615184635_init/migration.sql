/*
  Warnings:

  - You are about to drop the column `userId` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `facebook` on the `SchoolProfile` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `SchoolProfile` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `SchoolProfile` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `SchoolProfile` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `SchoolProfile` table. All the data in the column will be lost.
  - You are about to drop the column `youtube` on the `SchoolProfile` table. All the data in the column will be lost.
  - You are about to drop the `OwnersSchool` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `schooId` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Made the column `currentPosition` on table `Owner` required. This step will fail if there are existing NULL values in that column.
  - Made the column `educationBackground` on table `Owner` required. This step will fail if there are existing NULL values in that column.
  - Made the column `previousPositions` on table `Owner` required. This step will fail if there are existing NULL values in that column.
  - Made the column `professionalExperience` on table `Owner` required. This step will fail if there are existing NULL values in that column.
  - Made the column `yearsInEducation` on table `Owner` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "OwnersSchool" DROP CONSTRAINT "OwnersSchool_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "OwnersSchool" DROP CONSTRAINT "OwnersSchool_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_schoolId_fkey";

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "isAcitve" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "userId",
ADD COLUMN     "schooId" TEXT NOT NULL,
ALTER COLUMN "currentPosition" SET NOT NULL,
ALTER COLUMN "educationBackground" SET NOT NULL,
ALTER COLUMN "previousPositions" SET NOT NULL,
ALTER COLUMN "professionalExperience" SET NOT NULL,
ALTER COLUMN "yearsInEducation" SET NOT NULL;

-- AlterTable
ALTER TABLE "SchoolProfile" DROP COLUMN "facebook",
DROP COLUMN "instagram",
DROP COLUMN "linkedin",
DROP COLUMN "twitter",
DROP COLUMN "website",
DROP COLUMN "youtube";

-- DropTable
DROP TABLE "OwnersSchool";

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_schooId_fkey" FOREIGN KEY ("schooId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
