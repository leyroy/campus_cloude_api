/*
  Warnings:

  - You are about to drop the column `schooId` on the `Owner` table. All the data in the column will be lost.
  - Added the required column `schoolId` to the `Owner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Owner" DROP CONSTRAINT "Owner_schooId_fkey";

-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "schooId",
ADD COLUMN     "schoolId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
