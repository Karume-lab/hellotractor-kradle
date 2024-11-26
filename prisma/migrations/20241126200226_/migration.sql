-- DropForeignKey
ALTER TABLE "FileUpload" DROP CONSTRAINT "FileUpload_sellerCoverPictureId_fkey";

-- DropForeignKey
ALTER TABLE "FileUpload" DROP CONSTRAINT "FileUpload_sellerLogoId_fkey";

-- AlterTable
ALTER TABLE "FileUpload" ALTER COLUMN "profileId" DROP NOT NULL,
ALTER COLUMN "trainedOperatorId" DROP NOT NULL,
ALTER COLUMN "trainedOperatorServiceId" DROP NOT NULL,
ALTER COLUMN "sellerLicenseId" DROP NOT NULL,
ALTER COLUMN "sellerCoverPictureId" DROP NOT NULL,
ALTER COLUMN "sellerLogoId" DROP NOT NULL,
ALTER COLUMN "equipmentImageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_sellerCoverPictureId_fkey" FOREIGN KEY ("sellerCoverPictureId") REFERENCES "Seller"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_sellerLogoId_fkey" FOREIGN KEY ("sellerLogoId") REFERENCES "Seller"("id") ON DELETE SET NULL ON UPDATE CASCADE;
