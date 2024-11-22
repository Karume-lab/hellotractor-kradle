-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "dealerId" TEXT,
ALTER COLUMN "price" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
