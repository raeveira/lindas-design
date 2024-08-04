'use server';

import path from "path";
import fs from "fs";

export const fetchImages = async ({ category }: { category: string }): Promise<string[]> => {
    try {
        const rootDir = path.resolve(__dirname, "../../../..");
        const folderPath = path.join(rootDir, "public", category);

        if (!fs.existsSync(folderPath)) {
            throw new Error(`Category '${category}' not found. Path '${folderPath}' does not exist.`);
        }

        const allImages = await getAllImagesFromFolder(folderPath, rootDir);

        return allImages;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}

async function getAllImagesFromFolder(folderPath: string, rootDir: string): Promise<string[]> {
    const images: string[] = [];

    try {
        const files = fs.readdirSync(folderPath);

        for (const file of files) {
            const filePath = path.join(folderPath, file);

            if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
                const relativePath = path.relative(path.join(rootDir, 'public'), filePath).replace(/\\/g, '/');
                images.push(`/${relativePath}`);
            }

            if (fs.statSync(filePath).isDirectory()) {
                const nestedImages = await getAllImagesFromFolder(filePath, rootDir);
                images.push(...nestedImages);
            }
        }

        return images;
    } catch (error) {
        console.error("Error reading images:", error);
        throw error;
    }
}
