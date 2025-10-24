/*
  Warnings:

  - Added the required column `occupation` to the `guardians` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "guardians" ADD COLUMN     "occupation" TEXT NOT NULL;
