/*
  Warnings:

  - Added the required column `atk` to the `Pal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `def` to the `Pal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heal` to the `Pal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pal" ADD COLUMN     "atk" INTEGER NOT NULL,
ADD COLUMN     "def" INTEGER NOT NULL,
ADD COLUMN     "heal" INTEGER NOT NULL;
