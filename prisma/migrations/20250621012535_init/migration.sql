/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `School` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "School" DROP COLUMN "updatedAt";

-- RenameForeignKey
ALTER TABLE "School" RENAME CONSTRAINT "School_userId_fkey" TO "School_userId_updatedBy_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;
