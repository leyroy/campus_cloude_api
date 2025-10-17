-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_schoolId_fkey";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "SchoolProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
