CREATE TABLE "Media" (
  "id" TEXT NOT NULL,
  "publicId" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "secureUrl" TEXT NOT NULL,
  "width" INTEGER NOT NULL,
  "height" INTEGER NOT NULL,
  "format" TEXT NOT NULL,
  "bytes" INTEGER NOT NULL,
  "folder" TEXT NOT NULL DEFAULT 'cms',
  "alt" TEXT NOT NULL DEFAULT '',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Media_publicId_key" ON "Media"("publicId");
CREATE INDEX "Media_folder_idx" ON "Media"("folder");
CREATE INDEX "Media_createdAt_idx" ON "Media"("createdAt");
