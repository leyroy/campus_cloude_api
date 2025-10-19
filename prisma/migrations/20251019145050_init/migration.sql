/*
  Warnings:

  - You are about to drop the column `campusId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `schoolProfileId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Document` table. All the data in the column will be lost.
  - Added the required column `mudelId` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_schoolProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_userId_fkey";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "campusId",
DROP COLUMN "schoolProfileId",
DROP COLUMN "userId",
ADD COLUMN     "mudelId" TEXT NOT NULL;
