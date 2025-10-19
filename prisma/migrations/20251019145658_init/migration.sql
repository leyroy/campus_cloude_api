/*
  Warnings:

  - Added the required column `documentKey` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "FileType" ADD VALUE 'VIDEO';

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "documentKey" TEXT NOT NULL;
