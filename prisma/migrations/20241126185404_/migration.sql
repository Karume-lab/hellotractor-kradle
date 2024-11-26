-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_dealerId_fkey";

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
