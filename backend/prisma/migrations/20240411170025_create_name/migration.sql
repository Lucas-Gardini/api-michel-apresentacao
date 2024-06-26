/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Pal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Pal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pal" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pal_name_key" ON "Pal"("name");
