-- AlterTable
ALTER TABLE "departments" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "subjects" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isCore" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isElective" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "subjectCode" TEXT;
