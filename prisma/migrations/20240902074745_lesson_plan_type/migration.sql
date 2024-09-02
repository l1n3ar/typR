/*
  Warnings:

  - You are about to drop the column `type` on the `Lesson` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('INSTRUCTIONAL', 'PRACTICE');

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "LessonPlan" ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'PRACTICE';

-- AlterTable
ALTER TABLE "Module" ALTER COLUMN "description" DROP NOT NULL;

-- DropEnum
DROP TYPE "LessonType";
