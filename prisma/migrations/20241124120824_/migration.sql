/*
  Warnings:

  - A unique constraint covering the columns `[buyerId]` on the table `WishList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `buyerId` to the `WishList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Buyer" ADD COLUMN     "wishlistId" TEXT;

-- AlterTable
ALTER TABLE "Equipment" ADD COLUMN     "wishlistId" TEXT;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "buyerId" TEXT;

-- AlterTable
ALTER TABLE "WishList" ADD COLUMN     "buyerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WishList_buyerId_key" ON "WishList"("buyerId");

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "WishList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
