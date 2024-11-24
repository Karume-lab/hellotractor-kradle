/*
  Warnings:

  - You are about to drop the column `buyerId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_sellerId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "buyerId",
DROP COLUMN "sellerId";
