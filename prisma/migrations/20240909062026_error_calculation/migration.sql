-- CreateEnum
CREATE TYPE "ErrorCalculation" AS ENUM ('SST', 'NORMAL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "errorCalculation" "ErrorCalculation" NOT NULL DEFAULT 'NORMAL';
