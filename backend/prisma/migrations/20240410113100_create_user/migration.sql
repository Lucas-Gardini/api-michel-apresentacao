/*
  Warnings:

  - You are about to drop the `Personagem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Personagem";

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "health" INTEGER NOT NULL,
    "str" INTEGER NOT NULL,
    "inte" INTEGER NOT NULL,
    "dex" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwd" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
