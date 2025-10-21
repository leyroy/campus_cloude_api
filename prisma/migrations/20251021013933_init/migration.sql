/*
  Warnings:

  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[indexNumber]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `indexNumber` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RelationshipType" AS ENUM ('PARENT', 'GUARDIAN', 'SIBLING', 'RELATIVE', 'OTHER');

-- DropIndex
DROP INDEX "Student_email_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "email",
DROP COLUMN "isActive",
DROP COLUMN "phone",
ADD COLUMN     "indexNumber" TEXT NOT NULL,
ADD COLUMN     "studentNumber" TEXT,
ADD COLUMN     "stuentEmail" TEXT,
ALTER COLUMN "classId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "StudentAccadamicHistory" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "fromClass" TEXT NOT NULL,
    "toClass" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentAccadamicHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentGuardian" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "relationship" "RelationshipType" NOT NULL,
    "guardianEmail" TEXT NOT NULL,
    "guardianPhone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentGuardian_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_indexNumber_key" ON "Student"("indexNumber");

-- AddForeignKey
ALTER TABLE "StudentAccadamicHistory" ADD CONSTRAINT "StudentAccadamicHistory_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentGuardian" ADD CONSTRAINT "StudentGuardian_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
