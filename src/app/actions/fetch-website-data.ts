'use server';

import {getPrisma} from '@/lib/prisma-client';
import type {Website as WebsiteType} from "@/types/Website";

// In-memory cache
let cachedData: WebsiteType | null = null;
let lastCacheTime: number = 0; // Unix milliseconds of last cache refresh

/*
* Function to fetch website data by language
* @params language - the language code to filter the website data
* @returns an object containing the website data or an error message
*/
export async function fetchWebsiteData({language}: { language: string }): Promise<{
    data: WebsiteType | null,
    error: unknown
}> {
    const now = Date.now();
    const isProduction = process.env.NODE_ENV === 'production';

    // Determine cache expiry: Always expired in dev, only expired after midnight in prod
    let cacheExpired = true;

    if (isProduction) {
        // Calculate if the cache is from a previous day (midnight logic)
        const nowDate = new Date(now).getDate();
        const lastDate = new Date(lastCacheTime).getDate();
        cacheExpired = (cachedData === null) || (nowDate !== lastDate);
    }

    if (!isProduction) {
        // Always expired in development (or you could add a toggle for manual refresh)
        cacheExpired = true;
    }

    if (!cacheExpired && cachedData) {
        return {data: cachedData, error: null};
    }

    try {
        const prisma = await getPrisma();

        if (!prisma) {
            throw new Error('Prisma client is not initialized');
        }

        const data = await prisma.website.findUnique({
            where: {language: language},
            select: {
                id: true,
                language: true,
                photos: true,
                navigations: true,
                about: true,
                createdAt: true,
                updatedAt: true
            }
        });

        if (!data) {
            throw new Error(`No data found for language: ${language}`);
        }

        cachedData = data;
        lastCacheTime = now;
        return {data, error: null};

    } catch (error) {
        console.error('Error fetching website data:', error);
        if (error instanceof Error) {
            return {data: null, error: error.message};
        }
        return {data: null, error: 'An unknown error occurred'};
    }
};