-- DropForeignKey
ALTER TABLE "Pal" DROP CONSTRAINT "Pal_regionId_fkey";

-- AlterTable
ALTER TABLE "Pal" ALTER COLUMN "regionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pal" ADD CONSTRAINT "Pal_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;
