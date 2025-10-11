'use server';

import { PrismaClient } from '@/../generated/prisma';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        // configure as needed, e.g. log: ['query']
    });

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

// Only export async functions from a `use server` file
export async function getPrisma(): Promise<PrismaClient> {
    return prisma;
}