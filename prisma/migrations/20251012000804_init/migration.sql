-- CreateEnum
CREATE TYPE "SchooleType" AS ENUM ('PUBLIC', 'PRIVATE', 'CHARTER', 'MAGNET', 'RELIGIOUS', 'INTERNATIONAL');

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "educationLevel" "EducationLevel"[] DEFAULT ARRAY['PRIMARY_1', 'PRIMARY_2', 'PRIMARY_3', 'PRIMARY_4', 'PRIMARY_5', 'PRIMARY_6']::"EducationLevel"[],
ADD COLUMN     "type" "SchooleType" NOT NULL DEFAULT 'PUBLIC';
