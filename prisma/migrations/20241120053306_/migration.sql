/*
  Warnings:

  - You are about to drop the column `bio` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `slogan` on the `Seller` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "bio",
DROP COLUMN "name",
DROP COLUMN "slogan";
