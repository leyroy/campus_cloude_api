-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_addressId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "modelId" TEXT;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_modelId_schoolProfile_fkey" FOREIGN KEY ("modelId") REFERENCES "SchoolProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_modelId_user_fkey" FOREIGN KEY ("modelId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
