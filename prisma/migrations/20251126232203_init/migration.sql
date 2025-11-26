/*
  Warnings:

  - You are about to drop the column `updatedById` on the `classes` table. All the data in the column will be lost.
  - Added the required column `capacity` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `classes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classes" DROP COLUMN "updatedById",
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "createdById" TEXT NOT NULL;
