/*
  Warnings:

  - A unique constraint covering the columns `[palNumber]` on the table `Pal` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Pal" ADD COLUMN     "palNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pal_palNumber_key" ON "Pal"("palNumber");
