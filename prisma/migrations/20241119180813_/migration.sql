-- CreateTable
CREATE TABLE "Seller" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seller_profileId_key" ON "Seller"("profileId");

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
