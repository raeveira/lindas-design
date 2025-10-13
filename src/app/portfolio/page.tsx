'use client';

import {Footer} from "@/components/Footer";
import {NavigationBar} from "@/components/navigation-bar";
import {fetchWebsiteData} from "@/app/actions/fetch-website-data";
import {useEffect, useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import type {Website as WebsiteType} from "@/types/Website";
import Image from "next/image";
import {SelectedImage} from "@/components/selected-image";

const PortfolioPage = () => {
    const [websiteData, setWebsiteData] = useState<WebsiteType | null>(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await fetchWebsiteData({language: 'NL-nl'});

            if (error) {
                console.error('Error fetching website data:', error);
                return;
            }

            if (data) {
                console.log('Fetched website data:', data);
                setWebsiteData(data);
            }
        };

        void fetchData()
    }, []);

    if (!websiteData) {
        return <div>Loading...</div>;
    }

    const categories = Array.from(new Set(websiteData.photos.map(photo => photo.category))).filter(Boolean).slice(0, 4);

    const getPhotosByCategory = (category: string) => {
        const categoryPhotos = websiteData.photos.filter(photo => photo.category === category);

        // Sort photo's by url so the images can be changed from position only by changing the url
        const sortedPhotosByUrl = categoryPhotos.sort((a, b) => a.url.localeCompare(b.url));
        return sortedPhotosByUrl.sort((a, b) => a.url.localeCompare(b.url));
    }

    return (
        <>
            {selectedImageUrl && (
                <SelectedImage imageUrl={selectedImageUrl} setSelectedImageUrl={setSelectedImageUrl} />
            )}

            <NavigationBar navigationData={websiteData.navigations}/>

            <main className="flex h-screen w-screen flex-col items-center justify-between overflow-hidden">
                <div className={'w-full h-full flex flex-col justify-center items-center m-4 mt-24'}>
                    <Tabs defaultValue={categories[0]} className="w-8/9 h-full flex flex-col items-center">
                        <TabsList className="flex justify-center space-x-4">
                            {categories.map(category => (
                                <TabsTrigger
                                    key={category}
                                    value={category}
                                    className={"text-sm sm:text-base md:text-lg lg:text-xl px-3 sm:px-4 md:px-6 lg:px-8 py-1 sm:py-2 transition-transform duration-200 hover:scale-105 hover:cursor-pointer font-normal"}
                                >
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {categories.map((category) => (
                            <TabsContent key={category} value={category} className={'max-h-[75vh] overflow-y-auto'}>
                                <div
                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                    {getPhotosByCategory(category).map((photo) => (
                                        <div key={photo.id} className="w-full h-128 relative" onClick={() => setSelectedImageUrl(photo.url)}>
                                            <Image
                                                width={400}
                                                height={300}
                                                src={photo.url}
                                                alt={photo.description ?? 'Portfolio Image'}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </main>

            <Footer/>
        </>
    );
}

export default PortfolioPage;