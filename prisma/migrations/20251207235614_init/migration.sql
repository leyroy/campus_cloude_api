/*
  Warnings:

  - You are about to drop the column `isActive` on the `academicYears` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `terms` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[academicYearId,name]` on the table `terms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "AcademicYearStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- DropIndex
DROP INDEX "terms_academicYearId_number_key";

-- AlterTable
ALTER TABLE "academicYears" DROP COLUMN "isActive",
ADD COLUMN     "status" "AcademicYearStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "terms" DROP COLUMN "number";

-- CreateIndex
CREATE UNIQUE INDEX "terms_academicYearId_name_key" ON "terms"("academicYearId", "name");
