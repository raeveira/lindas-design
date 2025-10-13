import type {About, Navigation, Photo, PortfolioCategory, Website as PrismaWebsite,} from '@/../generated/prisma';

export type Website = PrismaWebsite & {
    photos: Photo[];
    portfolioCategory: PortfolioCategory[];
    navigations: Navigation[];
    about: About | null
}