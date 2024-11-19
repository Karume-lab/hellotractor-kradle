/*
  Warnings:

  - You are about to drop the `TrainedOperatorService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FileUpload" DROP CONSTRAINT "FileUpload_trainedOperatorServiceId_fkey";

-- DropForeignKey
ALTER TABLE "TrainedOperatorService" DROP CONSTRAINT "TrainedOperatorService_trainedOperatorId_fkey";

-- DropTable
DROP TABLE "TrainedOperatorService";

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "trainedOperatorId" TEXT,
    "businessId" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_trainedOperatorId_fkey" FOREIGN KEY ("trainedOperatorId") REFERENCES "TrainedOperator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_trainedOperatorServiceId_fkey" FOREIGN KEY ("trainedOperatorServiceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
