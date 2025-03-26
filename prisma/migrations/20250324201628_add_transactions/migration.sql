/*
  Warnings:

  - You are about to drop the column `comment` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "comment",
DROP COLUMN "type",
DROP COLUMN "userId",
ADD COLUMN     "description" TEXT,
ALTER COLUMN "date" SET DEFAULT timezone('utc'::text, now());
