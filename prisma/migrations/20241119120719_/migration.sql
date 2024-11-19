/*
  Warnings:

  - Added the required column `name` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openingHours` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageRating` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Equipment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EquipmentCondition" AS ENUM ('BRAND_NEW', 'SELLER_REFURBISHED', 'MANUFACTURER_REFURBISHED');

-- CreateEnum
CREATE TYPE "ReviewableFileUploadStatus" AS ENUM ('PENDING', 'REJECTED', 'APPROVED');

-- CreateEnum
CREATE TYPE "FileCategoryEnum" AS ENUM ('PROFILE_PICTURE', 'TRAINED_OPERATOR_CERTIFICATE', 'BUSINESS_LICENSE');

-- CreateEnum
CREATE TYPE "FileExtension" AS ENUM ('PNG', 'PDF', 'JPEG', 'WEBP', 'JPG');

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "openingHours" TEXT NOT NULL,
ADD COLUMN     "slogan" TEXT;

-- AlterTable
ALTER TABLE "Equipment" ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "condition" "EquipmentCondition",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "isSold" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "bio" TEXT;

-- AlterTable
ALTER TABLE "TrainedOperator" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "TrainedOperatorService" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "trainedOperatorId" TEXT,

    CONSTRAINT "TrainedOperatorService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "color" TEXT,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tractor" (
    "id" TEXT NOT NULL,
    "mileage" TEXT NOT NULL,
    "fuelCapacity" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,

    CONSTRAINT "Tractor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileUpload" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "extension" "FileExtension" NOT NULL,
    "category" "FileCategoryEnum" NOT NULL,
    "description" TEXT,
    "reviewableFileUploadId" TEXT,
    "profileId" TEXT NOT NULL,
    "trainedOperatorServiceId" TEXT NOT NULL,
    "businessLicenseId" TEXT NOT NULL,
    "businessCoverPictureId" TEXT NOT NULL,
    "businessLogoId" TEXT NOT NULL,
    "equipmentImageId" TEXT NOT NULL,

    CONSTRAINT "FileUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewableFileUpload" (
    "id" TEXT NOT NULL,
    "status" "ReviewableFileUploadStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "ReviewableFileUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishList" (
    "id" TEXT NOT NULL,

    CONSTRAINT "WishList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_equipmentId_key" ON "Attachment"("equipmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Tractor_equipmentId_key" ON "Tractor"("equipmentId");

-- CreateIndex
CREATE UNIQUE INDEX "FileUpload_profileId_key" ON "FileUpload"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "FileUpload_businessCoverPictureId_key" ON "FileUpload"("businessCoverPictureId");

-- CreateIndex
CREATE UNIQUE INDEX "FileUpload_businessLogoId_key" ON "FileUpload"("businessLogoId");

-- AddForeignKey
ALTER TABLE "TrainedOperatorService" ADD CONSTRAINT "TrainedOperatorService_trainedOperatorId_fkey" FOREIGN KEY ("trainedOperatorId") REFERENCES "TrainedOperator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tractor" ADD CONSTRAINT "Tractor_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_reviewableFileUploadId_fkey" FOREIGN KEY ("reviewableFileUploadId") REFERENCES "ReviewableFileUpload"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_trainedOperatorServiceId_fkey" FOREIGN KEY ("trainedOperatorServiceId") REFERENCES "TrainedOperatorService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_businessLicenseId_fkey" FOREIGN KEY ("businessLicenseId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_businessCoverPictureId_fkey" FOREIGN KEY ("businessCoverPictureId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_businessLogoId_fkey" FOREIGN KEY ("businessLogoId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_equipmentImageId_fkey" FOREIGN KEY ("equipmentImageId") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
