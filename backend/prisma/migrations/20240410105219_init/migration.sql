-- CreateTable
CREATE TABLE "Personagem" (
    "id" TEXT NOT NULL,
    "vida" INTEGER NOT NULL,
    "forca" INTEGER NOT NULL,
    "inteli" INTEGER NOT NULL,
    "dest" INTEGER NOT NULL,
    "velo" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Personagem_pkey" PRIMARY KEY ("id")
);
