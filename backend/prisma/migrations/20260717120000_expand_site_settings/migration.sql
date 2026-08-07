ALTER TABLE "SiteSetting" RENAME COLUMN "mapEmbed" TO "googleMapsUrl";

ALTER TABLE "SiteSetting"
  ADD COLUMN "tagline" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "description" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "heroButtonText" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "footerText" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "seoTitle" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "seoDescription" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "logoUrl" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "faviconUrl" TEXT NOT NULL DEFAULT '';

ALTER TABLE "SiteSetting"
  ALTER COLUMN "businessName" SET DEFAULT '',
  ALTER COLUMN "phone" SET DEFAULT '',
  ALTER COLUMN "whatsapp" SET DEFAULT '',
  ALTER COLUMN "email" SET DEFAULT '',
  ALTER COLUMN "address" SET DEFAULT '',
  ALTER COLUMN "instagram" SET DEFAULT '',
  ALTER COLUMN "facebook" SET DEFAULT '',
  ALTER COLUMN "youtube" SET DEFAULT '',
  ALTER COLUMN "googleMapsUrl" SET DEFAULT '',
  ALTER COLUMN "heroTitle" SET DEFAULT '',
  ALTER COLUMN "heroSubtitle" SET DEFAULT '';

UPDATE "SiteSetting" SET "facebook" = '' WHERE "facebook" IS NULL;
UPDATE "SiteSetting" SET "youtube" = '' WHERE "youtube" IS NULL;

ALTER TABLE "SiteSetting"
  ALTER COLUMN "facebook" SET NOT NULL,
  ALTER COLUMN "youtube" SET NOT NULL;
