/*
  Warnings:

  - You are about to drop the column `displayName` on the `Buyer` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Buyer` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Buyer` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `Buyer` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Buyer" DROP COLUMN "displayName",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "middleName";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "middleName" TEXT;
