import type {About, Navigation, Photo, Website as PrismaWebsite,} from '@/../generated/prisma';

export type Website = PrismaWebsite & {
    photos: Photo[];
    navigations: Navigation[];
    about: About | null
}