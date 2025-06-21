/*
  Warnings:

  - You are about to drop the column `addressId` on the `School` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_addressId_fkey";

-- AlterTable
ALTER TABLE "School" DROP COLUMN "addressId";
