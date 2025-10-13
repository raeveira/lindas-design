/*
  Warnings:

  - A unique constraint covering the columns `[language]` on the table `Website` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Website_language_key" ON "Website"("language");
