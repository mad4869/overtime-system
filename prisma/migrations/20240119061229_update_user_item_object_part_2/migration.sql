/*
  Warnings:

  - You are about to drop the column `date` on the `UserItem` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `UserItem` table. All the data in the column will be lost.
  - Added the required column `finishedTime` to the `UserItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `UserItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserItem" DROP COLUMN "date",
DROP COLUMN "duration",
ADD COLUMN     "finishedTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
