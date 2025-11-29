/*
  Warnings:

  - You are about to drop the column `firstName` on the `guardians` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `guardians` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `guardians` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "guardians" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "fullName" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;
