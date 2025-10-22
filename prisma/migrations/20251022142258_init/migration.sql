-- AlterTable
ALTER TABLE "students" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "prefix" "Prefix";
