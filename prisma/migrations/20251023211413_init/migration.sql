/*
  Warnings:

  - You are about to drop the column `guardianEmail` on the `guardians` table. All the data in the column will be lost.
  - You are about to drop the column `guardianPhone` on the `guardians` table. All the data in the column will be lost.
  - Added the required column `email` to the `guardians` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `guardians` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "guardians" DROP COLUMN "guardianEmail",
DROP COLUMN "guardianPhone",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
