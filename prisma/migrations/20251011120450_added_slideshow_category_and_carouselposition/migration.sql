/*
  Warnings:

  - You are about to drop the column `carousel` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Category" ADD VALUE 'slideshow';

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "carousel",
ADD COLUMN     "carouselPosition" INTEGER DEFAULT 0;
