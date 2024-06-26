/*
  Warnings:

  - You are about to drop the column `atk` on the `Pal` table. All the data in the column will be lost.
  - You are about to drop the column `def` on the `Pal` table. All the data in the column will be lost.
  - You are about to drop the column `health` on the `Pal` table. All the data in the column will be lost.
  - Added the required column `companionSkill` to the `Pal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `element` to the `Pal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pal" DROP COLUMN "atk",
DROP COLUMN "def",
DROP COLUMN "health",
ADD COLUMN     "companionSkill" TEXT NOT NULL,
ADD COLUMN     "element" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AptitudeWork" (
    "id" TEXT NOT NULL,
    "palId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "AptitudeWork_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AptitudeWork" ADD CONSTRAINT "AptitudeWork_palId_fkey" FOREIGN KEY ("palId") REFERENCES "Pal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
