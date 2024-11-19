/*
  Warnings:

  - You are about to drop the column `businessCoverPictureId` on the `FileUpload` table. All the data in the column will be lost.
  - You are about to drop the column `businessLicenseId` on the `FileUpload` table. All the data in the column will be lost.
  - You are about to drop the column `businessLogoId` on the `FileUpload` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the `Business` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sellerCoverPictureId]` on the table `FileUpload` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sellerLogoId]` on the table `FileUpload` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sellerCoverPictureId` to the `FileUpload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerLicenseId` to the `FileUpload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerLogoId` to the `FileUpload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_profileId_fkey";

-- DropForeignKey
ALTER TABLE "FileUpload" DROP CONSTRAINT "FileUpload_businessCoverPictureId_fkey";

-- DropForeignKey
ALTER TABLE "FileUpload" DROP CONSTRAINT "FileUpload_businessLicenseId_fkey";

-- DropForeignKey
ALTER TABLE "FileUpload" DROP CONSTRAINT "FileUpload_businessLogoId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_businessId_fkey";

-- DropIndex
DROP INDEX "FileUpload_businessCoverPictureId_key";

-- DropIndex
DROP INDEX "FileUpload_businessLogoId_key";

-- DropIndex
DROP INDEX "Seller_profileId_key";

-- AlterTable
ALTER TABLE "FileUpload" DROP COLUMN "businessCoverPictureId",
DROP COLUMN "businessLicenseId",
DROP COLUMN "businessLogoId",
ADD COLUMN     "sellerCoverPictureId" TEXT NOT NULL,
ADD COLUMN     "sellerLicenseId" TEXT NOT NULL,
ADD COLUMN     "sellerLogoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "businessId",
ADD COLUMN     "sellerId" TEXT;

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "isDealer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "openingHours" TEXT,
ADD COLUMN     "slogan" TEXT;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "businessId";

-- DropTable
DROP TABLE "Business";

-- CreateIndex
CREATE UNIQUE INDEX "FileUpload_sellerCoverPictureId_key" ON "FileUpload"("sellerCoverPictureId");

-- CreateIndex
CREATE UNIQUE INDEX "FileUpload_sellerLogoId_key" ON "FileUpload"("sellerLogoId");

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_sellerLicenseId_fkey" FOREIGN KEY ("sellerLicenseId") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_sellerCoverPictureId_fkey" FOREIGN KEY ("sellerCoverPictureId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_sellerLogoId_fkey" FOREIGN KEY ("sellerLogoId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
