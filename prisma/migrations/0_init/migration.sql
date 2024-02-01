-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "npk" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "position" VARCHAR(255) NOT NULL,
    "unit" VARCHAR(255) NOT NULL,
    "department" VARCHAR(255) NOT NULL,
    "company" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserItem" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "item" TEXT NOT NULL,
    "startTime" TIMESTAMPTZ NOT NULL,
    "finishedTime" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userItemRecapId" INTEGER,

    CONSTRAINT "UserItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserItemRecap" (
    "id" SERIAL NOT NULL,
    "isApprovedByVP" BOOLEAN NOT NULL DEFAULT false,
    "isApprovedByAVP" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserItemRecap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_npk_key" ON "User"("npk");

-- AddForeignKey
ALTER TABLE "UserItem" ADD CONSTRAINT "UserItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItem" ADD CONSTRAINT "UserItem_userItemRecapId_fkey" FOREIGN KEY ("userItemRecapId") REFERENCES "UserItemRecap"("id") ON DELETE SET NULL ON UPDATE CASCADE;

