/*
  Warnings:

  - You are about to drop the column `palId` on the `AptitudeWork` table. All the data in the column will be lost.
  - Added the required column `palName` to the `AptitudeWork` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AptitudeWork" DROP CONSTRAINT "AptitudeWork_palId_fkey";

-- AlterTable
ALTER TABLE "AptitudeWork" DROP COLUMN "palId",
ADD COLUMN     "palName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AptitudeWork" ADD CONSTRAINT "AptitudeWork_palName_fkey" FOREIGN KEY ("palName") REFERENCES "Pal"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
