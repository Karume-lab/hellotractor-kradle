/*
  Warnings:

  - You are about to drop the column `profileId` on the `TrainedOperator` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TrainedOperator" DROP CONSTRAINT "TrainedOperator_profileId_fkey";

-- DropIndex
DROP INDEX "TrainedOperator_profileId_key";

-- AlterTable
ALTER TABLE "TrainedOperator" DROP COLUMN "profileId";
