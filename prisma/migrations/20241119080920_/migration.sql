/*
  Warnings:

  - You are about to drop the column `userId` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Buyer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TrainedOperator` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `trainedOperatorId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `Buyer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId]` on the table `TrainedOperator` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Buyer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `TrainedOperator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_userId_fkey";

-- DropForeignKey
ALTER TABLE "Buyer" DROP CONSTRAINT "Buyer_userId_fkey";

-- DropForeignKey
ALTER TABLE "TrainedOperator" DROP CONSTRAINT "TrainedOperator_userId_fkey";

-- DropIndex
DROP INDEX "Buyer_userId_key";

-- DropIndex
DROP INDEX "TrainedOperator_userId_key";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Buyer" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TrainedOperator" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "businessId",
DROP COLUMN "trainedOperatorId",
ADD COLUMN     "profileId" TEXT;

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessId" TEXT,
    "trainedOperatorId" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Buyer_profileId_key" ON "Buyer"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainedOperator_profileId_key" ON "TrainedOperator"("profileId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buyer" ADD CONSTRAINT "Buyer_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainedOperator" ADD CONSTRAINT "TrainedOperator_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
