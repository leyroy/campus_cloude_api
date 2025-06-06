/*
  Warnings:

  - Changed the type of `type` on the `verificationToken` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "VerificationType" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET', 'PHONE_VERIFICATION', 'TWO_FACTOR_AUTHENTICATION', 'CHANGE_EMAIL', 'CHANGE_PHONE', 'ACCOUNT_ACTIVATION', 'ACCOUNT_DELETION');

-- AlterTable
ALTER TABLE "verificationToken" DROP COLUMN "type",
ADD COLUMN     "type" "VerificationType" NOT NULL;
