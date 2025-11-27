import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"; 


const globalForPrisma = global as typeof globalThis & { prisma?: PrismaClient };


const databaseUrl = process.env.DATABASE_URL || "file:./dev.db";

const adapter = new PrismaBetterSqlite3({ url: databaseUrl });

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;