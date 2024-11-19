/*
  Warnings:

  - Made the column `averageRating` on table `Equipment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Equipment" ALTER COLUMN "averageRating" SET NOT NULL;
