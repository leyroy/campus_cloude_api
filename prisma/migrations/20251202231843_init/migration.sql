/*
  Warnings:

  - You are about to drop the column `level` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "guardians" ALTER COLUMN "occupation" DROP NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "level";
