'use client';
import {useEffect, useState} from "react";
import {fetchWebsiteData} from "@/app/actions/fetch-website-data";
import {NavigationBar} from "@/components/navigation-bar";
import type {Website as WebsiteType} from "@/types/Website";
import {Carousel} from "@/components/carousel";
import {Footer} from "@/components/Footer";

export default function Home() {
    const [websiteData, setWebsiteData] = useState<WebsiteType | null>(null);

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

    // Filter carousel photos
    const carouselPhotos = websiteData.photos.filter(photo => photo.category == 'slideshow');

    console.log(carouselPhotos);

    // Split photos into groups of 2 for each carousel based on carouselPosition
    const firstCarouselPhotos = carouselPhotos.filter(photo => [0, 1].includes(photo.carouselPosition ?? -1))
        .sort((a, b) => (a.carouselPosition ?? -1) - (b.carouselPosition ?? -1));
    const secondCarouselPhotos = carouselPhotos.filter(photo => [2, 3].includes(photo.carouselPosition ?? -1))
        .sort((a, b) => (a.carouselPosition ?? -1) - (b.carouselPosition ?? -1));
    const thirdCarouselPhotos = carouselPhotos.filter(photo => [4, 5].includes(photo.carouselPosition ?? -1))
        .sort((a, b) => (a.carouselPosition ?? -1) - (b.carouselPosition ?? -1));

    return (
        <>
            <NavigationBar navigationData={websiteData.navigations}/>
            <main className="flex max-h-[90vh] h-screen w-screen flex-col items-center justify-between max-sm:mb-4">

                <div className={'w-full h-full flex flex-col justify-center items-center m-4 mt-24 max-sm:mb-8'}>
                    <div className={'flex flex-row justify-around items-center w-8/9 gap-x-8 h-full overflow-hidden'}>
                        <Carousel images={firstCarouselPhotos} delay={0} mobile={true}/>
                        <Carousel images={secondCarouselPhotos} delay={1000}/>
                        <Carousel images={thirdCarouselPhotos} delay={2000}/>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
}
