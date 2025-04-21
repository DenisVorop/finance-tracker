import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const adapter = new PrismaLibSQL({
  url: `${process.env.LIBSQL_DATABASE_URL}`,
  authToken: `${process.env.LIBSQL_DATABASE_TOKEN}`,
});
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
