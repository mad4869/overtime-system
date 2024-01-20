/*
  Warnings:

  - The primary key for the `UserItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `date` to the `UserItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserItem" DROP CONSTRAINT "UserItem_pkey",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserItem_pkey" PRIMARY KEY ("id");
