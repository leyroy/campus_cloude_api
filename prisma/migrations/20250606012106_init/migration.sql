/*
  Warnings:

  - You are about to drop the column `contactEmail` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `contactPhone` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `adminNodte` on the `SchoolProfile` table. All the data in the column will be lost.
  - You are about to drop the column `updatedByid` on the `SchoolProfile` table. All the data in the column will be lost.
  - You are about to drop the `verificationToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contactEmail` to the `SchoolProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPhone` to the `SchoolProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `SchoolProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedById` to the `SchoolProfile` table without a default value. This is not possible if the table is not empty.
  - Made the column `slogan` on table `SchoolProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `about` on table `SchoolProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `motto` on table `SchoolProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "School" DROP COLUMN "contactEmail",
DROP COLUMN "contactPhone",
DROP COLUMN "description";

-- AlterTable
ALTER TABLE "SchoolProfile" DROP COLUMN "adminNodte",
DROP COLUMN "updatedByid",
ADD COLUMN     "adminNote" TEXT,
ADD COLUMN     "contactEmail" TEXT NOT NULL,
ADD COLUMN     "contactPhone" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "updatedById" TEXT NOT NULL,
ALTER COLUMN "slogan" SET NOT NULL,
ALTER COLUMN "about" SET NOT NULL,
ALTER COLUMN "motto" SET NOT NULL;

-- DropTable
DROP TABLE "verificationToken";

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "type" "VerificationType" NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE INDEX "VerificationToken_identifier_idx" ON "VerificationToken"("identifier");
