/*
  Warnings:

  - You are about to drop the `WishList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_wishlistId_fkey";

-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_buyerId_fkey";

-- DropTable
DROP TABLE "WishList";

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_buyerId_key" ON "Wishlist"("buyerId");

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
