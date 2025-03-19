-- CreateEnum
CREATE TYPE "BillType" AS ENUM ('REGULAR', 'SAVINGS', 'DEBT_OWE', 'DEBT_LEND');

-- CreateTable
CREATE TABLE "Bill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "BillType" NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "description" TEXT,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "includeInTotal" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT timezone('utc'::text, now()),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT timezone('utc'::text, now()),

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
