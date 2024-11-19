/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Seller_profileId_key" ON "Seller"("profileId");
