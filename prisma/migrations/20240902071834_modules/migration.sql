/*
  Warnings:

  - The values [VIDEO] on the enum `LessonType` will be removed. If these variants are still used in the database, this will fail.
  - The `level` column on the `LessonPlan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('BASIC', 'INTERMEDIATE', 'ADVANCED');

-- AlterEnum
BEGIN;
CREATE TYPE "LessonType_new" AS ENUM ('INSTRUCTIONAL', 'PRACTICE');
ALTER TABLE "Lesson" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Lesson" ALTER COLUMN "type" TYPE "LessonType_new" USING ("type"::text::"LessonType_new");
ALTER TYPE "LessonType" RENAME TO "LessonType_old";
ALTER TYPE "LessonType_new" RENAME TO "LessonType";
DROP TYPE "LessonType_old";
ALTER TABLE "Lesson" ALTER COLUMN "type" SET DEFAULT 'PRACTICE';
COMMIT;

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "level" "Level" NOT NULL DEFAULT 'BASIC';

-- AlterTable
ALTER TABLE "LessonPlan" DROP COLUMN "level",
ADD COLUMN     "level" "Level" NOT NULL DEFAULT 'BASIC';

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "level" "Level" NOT NULL DEFAULT 'BASIC';
