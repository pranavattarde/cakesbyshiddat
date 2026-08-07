CREATE TYPE "EggOption" AS ENUM ('EGG', 'EGGLESS', 'BOTH');
CREATE TYPE "CakeStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SEASONAL', 'MADE_TO_ORDER');

ALTER TABLE "CakeCategory"
  ADD COLUMN "slug" TEXT,
  ADD COLUMN "description" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "displayOrder" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "active" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "coverMediaId" TEXT,
  ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

UPDATE "CakeCategory" SET "slug" = CONCAT('category-', "id") WHERE "slug" IS NULL;
ALTER TABLE "CakeCategory" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "CakeCategory_slug_key" ON "CakeCategory"("slug");
CREATE INDEX "CakeCategory_displayOrder_idx" ON "CakeCategory"("displayOrder");
CREATE INDEX "CakeCategory_active_idx" ON "CakeCategory"("active");
ALTER TABLE "CakeCategory" ADD CONSTRAINT "CakeCategory_coverMediaId_fkey" FOREIGN KEY ("coverMediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Cake" RENAME COLUMN "title" TO "name";
ALTER TABLE "Cake"
  ADD COLUMN "shortDescription" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "bestSeller" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "newArrival" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "trending" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "eggOption" "EggOption" NOT NULL DEFAULT 'BOTH',
  ADD COLUMN "status" "CakeStatus" NOT NULL DEFAULT 'ACTIVE',
  ADD COLUMN "displayOrder" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "seoTitle" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "seoDescription" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "coverMediaId" TEXT;

ALTER TABLE "Cake" DROP COLUMN "price", DROP COLUMN "image";
CREATE INDEX "Cake_categoryId_idx" ON "Cake"("categoryId");
CREATE INDEX "Cake_status_idx" ON "Cake"("status");
CREATE INDEX "Cake_featured_idx" ON "Cake"("featured");
CREATE INDEX "Cake_displayOrder_idx" ON "Cake"("displayOrder");
ALTER TABLE "Cake" ADD CONSTRAINT "Cake_coverMediaId_fkey" FOREIGN KEY ("coverMediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "CakePrice" (
  "id" TEXT NOT NULL,
  "cakeId" TEXT NOT NULL,
  "weight" TEXT NOT NULL,
  "price" DECIMAL(10,2) NOT NULL,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "CakePrice_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "CakePrice_cakeId_idx" ON "CakePrice"("cakeId");
CREATE INDEX "CakePrice_cakeId_displayOrder_idx" ON "CakePrice"("cakeId", "displayOrder");
ALTER TABLE "CakePrice" ADD CONSTRAINT "CakePrice_cakeId_fkey" FOREIGN KEY ("cakeId") REFERENCES "Cake"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "CakeFlavor" (
  "id" TEXT NOT NULL,
  "cakeId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "CakeFlavor_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "CakeFlavor_cakeId_idx" ON "CakeFlavor"("cakeId");
CREATE INDEX "CakeFlavor_cakeId_displayOrder_idx" ON "CakeFlavor"("cakeId", "displayOrder");
ALTER TABLE "CakeFlavor" ADD CONSTRAINT "CakeFlavor_cakeId_fkey" FOREIGN KEY ("cakeId") REFERENCES "Cake"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "CakeMedia" (
  "cakeId" TEXT NOT NULL,
  "mediaId" TEXT NOT NULL,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "CakeMedia_pkey" PRIMARY KEY ("cakeId", "mediaId")
);
CREATE INDEX "CakeMedia_mediaId_idx" ON "CakeMedia"("mediaId");
CREATE INDEX "CakeMedia_cakeId_displayOrder_idx" ON "CakeMedia"("cakeId", "displayOrder");
ALTER TABLE "CakeMedia" ADD CONSTRAINT "CakeMedia_cakeId_fkey" FOREIGN KEY ("cakeId") REFERENCES "Cake"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CakeMedia" ADD CONSTRAINT "CakeMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
