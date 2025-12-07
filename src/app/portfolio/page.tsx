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
                setWebsiteData(data);
            }
        };

        void fetchData()
    }, []);

    if (!websiteData) {
        return <div>Loading...</div>;
    }

    // Sort categories by position in portfolioCategory
    const tabCategories = websiteData.portfolioCategory.sort((a, b) => a.position - b.position);

    const getPhotosByCategory = (category: string) => {
        const categoryPhotos = websiteData.photos.filter(photo => photo.category === category);

        // Sort photo's by url so the images can be changed from position only by changing the url
        const sortedPhotosByUrl = categoryPhotos.sort((a, b) => a.url.localeCompare(b.url));
        return sortedPhotosByUrl.sort((a, b) => a.url.localeCompare(b.url));
    }

    return (
        <div className={'flex flex-col h-screen w-screen'}>
            {selectedImageUrl && (
                <SelectedImage imageUrl={selectedImageUrl} setSelectedImageUrl={setSelectedImageUrl} />
            )}

            <NavigationBar navigationData={websiteData.navigations}/>

            <main className="flex flex-1 flex-col items-center justify-between overflow-hidden p-2 sm:p-4">
                <div className={'w-full h-full flex flex-col justify-center items-center'}>
                    <Tabs defaultValue={tabCategories[0].category} className="w-8/9 h-full flex flex-col items-center">
                        <TabsList className="flex justify-center space-x-4">
                            {tabCategories.map(({category, name}) => (
                                <TabsTrigger
                                    key={category}
                                    value={category}
                                    className={"text-sm sm:text-base md:text-lg lg:text-xl px-3 sm:px-4 md:px-6 lg:px-8 py-1 sm:py-2 transition-transform duration-200 hover:scale-105 hover:cursor-pointer font-normal"}
                                >
                                    {name}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {tabCategories.map(({ category }) => (
                            <TabsContent key={category} value={category} className={'max-h-[75vh] lg:max-w-[70vw] overflow-y-auto'}>
                                <div
                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                    {getPhotosByCategory(category).map((photo) => (
                                        <div key={photo.id} className="w-full h-128 relative hover:cursor-pointer" onClick={() => setSelectedImageUrl(photo.url)}>
                                            <Image
                                                width={400}
                                                height={300}
                                                src={photo.url}
                                                alt={photo.description ?? 'Portfolio Image'}
                                                className="w-full h-full object-cover rounded-lg"
                                                loading={'lazy'}
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
        </div>
    );
}

export default PortfolioPage;