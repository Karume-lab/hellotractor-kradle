/*
  Warnings:

  - Added the required column `countryId` to the `County` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dealerId` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "County" ADD COLUMN     "countryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "dealerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "County" ADD CONSTRAINT "County_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
