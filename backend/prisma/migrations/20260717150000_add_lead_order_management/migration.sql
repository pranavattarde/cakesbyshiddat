CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'QUOTED', 'CONFIRMED', 'IN_PROGRESS', 'READY', 'COMPLETED', 'CANCELLED');
CREATE TYPE "Priority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');
CREATE TYPE "DeliveryType" AS ENUM ('PICKUP', 'HOME_DELIVERY');

CREATE TABLE "Customer" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "whatsapp" TEXT NOT NULL DEFAULT '',
  "email" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
CREATE INDEX "Customer_name_idx" ON "Customer"("name");

CREATE TABLE "Inquiry" (
  "id" TEXT NOT NULL,
  "customerId" TEXT NOT NULL,
  "cakeId" TEXT,
  "eventType" TEXT NOT NULL,
  "eventDate" TIMESTAMP(3) NOT NULL,
  "deliveryType" "DeliveryType" NOT NULL,
  "deliveryAddress" TEXT NOT NULL DEFAULT '',
  "deliveryTime" TEXT NOT NULL DEFAULT '',
  "guestCount" INTEGER NOT NULL,
  "weight" DECIMAL(10,2) NOT NULL,
  "budget" DECIMAL(10,2) NOT NULL,
  "eggOption" "EggOption" NOT NULL DEFAULT 'BOTH',
  "flavour" TEXT NOT NULL DEFAULT '',
  "message" TEXT NOT NULL DEFAULT '',
  "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
  "priority" "Priority" NOT NULL DEFAULT 'NORMAL',
  "assignedTo" TEXT NOT NULL DEFAULT '',
  "quotationAmount" DECIMAL(10,2),
  "adminNotes" TEXT NOT NULL DEFAULT '',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "Inquiry_customerId_idx" ON "Inquiry"("customerId");
CREATE INDEX "Inquiry_cakeId_idx" ON "Inquiry"("cakeId");
CREATE INDEX "Inquiry_status_idx" ON "Inquiry"("status");
CREATE INDEX "Inquiry_priority_idx" ON "Inquiry"("priority");
CREATE INDEX "Inquiry_eventDate_idx" ON "Inquiry"("eventDate");
CREATE INDEX "Inquiry_createdAt_idx" ON "Inquiry"("createdAt");
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_cakeId_fkey" FOREIGN KEY ("cakeId") REFERENCES "Cake"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE "InquiryMedia" (
  "id" TEXT NOT NULL,
  "inquiryId" TEXT NOT NULL,
  "mediaId" TEXT NOT NULL,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "InquiryMedia_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "InquiryMedia_inquiryId_mediaId_key" ON "InquiryMedia"("inquiryId", "mediaId");
CREATE INDEX "InquiryMedia_mediaId_idx" ON "InquiryMedia"("mediaId");
CREATE INDEX "InquiryMedia_inquiryId_displayOrder_idx" ON "InquiryMedia"("inquiryId", "displayOrder");
ALTER TABLE "InquiryMedia" ADD CONSTRAINT "InquiryMedia_inquiryId_fkey" FOREIGN KEY ("inquiryId") REFERENCES "Inquiry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "InquiryMedia" ADD CONSTRAINT "InquiryMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
