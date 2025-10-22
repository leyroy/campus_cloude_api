/*
  Warnings:

  - You are about to drop the column `mudelId` on the `documents` table. All the data in the column will be lost.
  - Added the required column `modelId` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "documents" DROP COLUMN "mudelId",
ADD COLUMN     "modelId" TEXT NOT NULL;
