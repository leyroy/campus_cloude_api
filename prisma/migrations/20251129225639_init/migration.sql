/*
  Warnings:

  - You are about to drop the column `courseId` on the `classes` table. All the data in the column will be lost.
  - Made the column `departmentId` on table `courses` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_courseId_fkey";

-- AlterTable
ALTER TABLE "classes" DROP COLUMN "courseId";

-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "departmentId" SET NOT NULL;
