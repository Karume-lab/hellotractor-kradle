/*
  Warnings:

  - You are about to drop the column `openingHours` on the `Seller` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "openingHours",
ADD COLUMN     "businessOpeningHours" TEXT;
