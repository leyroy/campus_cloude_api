/*
  Warnings:

  - You are about to drop the column `ownerId` on the `School` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Owner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_ownerId_fkey";

-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "School" DROP COLUMN "ownerId";
