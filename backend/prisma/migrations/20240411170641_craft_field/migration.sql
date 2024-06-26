/*
  Warnings:

  - Added the required column `craft` to the `Pal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pal" ADD COLUMN     "craft" INTEGER NOT NULL;
