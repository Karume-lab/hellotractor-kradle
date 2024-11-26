/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `County` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "County" DROP COLUMN "phoneNumber";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "phoneNumber" TEXT;
