/*
  Warnings:

  - You are about to drop the column `modelId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `isAcitve` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `School` table. All the data in the column will be lost.
  - You are about to drop the `_SchoolProfileToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedById` to the `School` table without a default value. This is not possible if the table is not empty.
  - Made the column `founderBio` on table `SchoolProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `licenseNumber` on table `SchoolProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `adminNote` on table `SchoolProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_modelId_schoolProfile_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_modelId_user_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_userId_updatedBy_fkey";

-- DropForeignKey
ALTER TABLE "SchoolProfile" DROP CONSTRAINT "SchoolProfile_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "_SchoolProfileToUser" DROP CONSTRAINT "_SchoolProfileToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SchoolProfileToUser" DROP CONSTRAINT "_SchoolProfileToUser_B_fkey";

-- DropIndex
DROP INDEX "School_userId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "modelId",
ADD COLUMN     "schoolId" TEXT,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "isAcitve",
DROP COLUMN "schoolId",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "schoolProfileId" TEXT;

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "schoolId";

-- AlterTable
ALTER TABLE "School" DROP COLUMN "userId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "updatedById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SchoolProfile" ALTER COLUMN "founderBio" SET NOT NULL,
ALTER COLUMN "licenseNumber" SET NOT NULL,
ALTER COLUMN "adminNote" SET NOT NULL;

-- DropTable
DROP TABLE "_SchoolProfileToUser";

-- CreateTable
CREATE TABLE "_SchoolToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SchoolToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SchoolToUser_B_index" ON "_SchoolToUser"("B");

-- AddForeignKey
ALTER TABLE "SchoolProfile" ADD CONSTRAINT "SchoolProfile_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "SchoolProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_schoolProfileId_fkey" FOREIGN KEY ("schoolProfileId") REFERENCES "SchoolProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchoolToUser" ADD CONSTRAINT "_SchoolToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchoolToUser" ADD CONSTRAINT "_SchoolToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
