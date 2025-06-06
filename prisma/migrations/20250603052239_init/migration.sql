/*
  Warnings:

  - Added the required column `contactEmail` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPhone` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('IMAGE', 'PDF', 'DOCX', 'XLSX', 'PPTX', 'TEXT', 'CSV', 'ZIP', 'OTHER');

-- CreateEnum
CREATE TYPE "DocPurpose" AS ENUM ('SCHOOL_LOGO', 'SCHOOL_SEAL', 'LICENSE_CERT', 'PROOF_OF_ADDRESS', 'HEADMASTER_ID', 'GENERAL_UPLOAD');

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "contactEmail" TEXT NOT NULL,
ADD COLUMN     "contactPhone" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SchoolProfile" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "slogan" TEXT,
    "about" TEXT,
    "establishedAt" TIMESTAMP(3),
    "motto" TEXT,
    "colors" TEXT,
    "website" TEXT,
    "facebook" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,
    "instagram" TEXT,
    "youtube" TEXT,
    "principalName" TEXT,
    "principalBio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolRequestMetadata" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "founderName" TEXT NOT NULL,
    "headmasterName" TEXT NOT NULL,
    "headmasterPhone" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "certificateUrl" TEXT NOT NULL,
    "proofOfAddressUrl" TEXT NOT NULL,
    "adminNote" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SchoolRequestMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileType" "FileType" NOT NULL,
    "purpose" "DocPurpose" NOT NULL,
    "schoolId" TEXT,
    "userId" TEXT,
    "campusId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SchoolProfile_schoolId_key" ON "SchoolProfile"("schoolId");

-- AddForeignKey
ALTER TABLE "SchoolProfile" ADD CONSTRAINT "SchoolProfile_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolRequestMetadata" ADD CONSTRAINT "SchoolRequestMetadata_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolRequestMetadata" ADD CONSTRAINT "SchoolRequestMetadata_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;
