'use client'
import {useEffect, useState} from "react";
import {fetchWebsiteData} from "@/app/actions/fetch-website-data";
import {NavigationBar} from "@/components/navigation-bar";
import type {Website as WebsiteType} from "@/types/Website";
import {Footer} from "@/components/Footer";
import Image from "next/image";

const AboutPage = () => {
    const [websiteData, setWebsiteData] = useState<WebsiteType | null>(null);

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

    if (!websiteData.about) {
        return <div>No about information available.</div>;
    }

    return (
        <>
            <NavigationBar navigationData={websiteData.navigations}/>
            <main className="flex max-h-[90vh] h-screen w-screen flex-col items-center justify-between max-sm:mb-4">

                <div className={'w-full h-full flex flex-col justify-center items-center m-4 mt-24 max-sm:mb-8'}>
                    <div
                        className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-8 max-sm:mb-8 max-sm:max-h-[80vh] max-sm:overflow-y-auto max-sm:overflow-x-hidden h-full p-4"
                    >
                        {/* Image on the left */}
                        <div className="md:w-2/5 w-full h-auto">
                            <Image
                                src={websiteData.about.imageUrl}
                                alt="Selfie"
                                width={400}
                                height={400}
                                className="w-full h-auto object-contain rounded-lg"
                            />
                        </div>

                        {/* Text on the right */}
                        <div className="md:w-3/5 w-full text-lg leading-relaxed whitespace-pre-wrap md:max-h-[60vh] md:overflow-y-auto md:overflow-x-hidden max-sm:mb-8">
                            {websiteData.about.content.split(/\. /).map((sentence, index, arr) => (
                                <span key={index}>
        {sentence.trim()}.
                                    {index < arr.length - 1 && <><br/><br/></>}
      </span>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
            <Footer/>
        </>
    )
}

export default AboutPage;