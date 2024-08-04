import * as React from 'react';
import { Suspense } from 'react';
import { fetchImages } from '@/lib/api/fetch-images';
import { language } from '@/lib/data/language';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { openDB } from 'idb';

const dbPromise = openDB('image-cache', 1, {
    upgrade(db) {
        db.createObjectStore('images');
    },
});

const Showcase = ({ category, title }: { category: string; title: string }) => {
    const [images, setImages] = React.useState<string[]>([]);
    const [languageText, setLanguageText] = React.useState(language.dutch);
    const [showModal, setShowModal] = React.useState(false);
    const [modalImage, setModalImage] = React.useState<string>('');
    const [modalIndex, setModalIndex] = React.useState<number>(0);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        setLanguageText(storedLanguage === 'english' ? language.english : language.dutch);
    }, []);

    React.useEffect(() => {
        setLoading(true);
        const getImages = async () => {
            const cachedImages = await getCachedImages(category);
            if (cachedImages) {
                setImages(cachedImages);
                setLoading(false);
            } else {
                try {
                    const data = await fetchImages({ category });
                    const watermarkedImages = await Promise.all(data.map(image => addTextWatermark(image)));
                    setImages(watermarkedImages);
                    setLoading(false);
                    await cacheImages(category, watermarkedImages);
                } catch (error) {
                    console.error('Error fetching or processing images:', error);
                }
            }
        };

        getImages();
    }, [category]);

    const getCachedImages = async (category: string) => {
        const db = await dbPromise;
        return (await db.get('images', category)) as string[] | undefined;
    };

    const cacheImages = async (category: string, images: string[]) => {
        const db = await dbPromise;
        await db.put('images', images, category);
    };

    const addTextWatermark = async (imageUrl: string) => {
        return new Promise<string>((resolve, reject) => {
            const img = new window.Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    reject(new Error('Could not create canvas context'));
                    return;
                }

                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                ctx.font = '20px Arial';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.fillText('lindas-design', 10, canvas.height - 10);

                const watermarkedImageUrl = canvas.toDataURL();
                resolve(watermarkedImageUrl);
            };

            img.onerror = (event) => {
                reject(new Error('Image loading error: ' + (event as ErrorEvent).message));
            };

            img.src = imageUrl;
        });
    };

    let languageTitle = '';

    switch (title) {
        case '1':
            languageTitle = languageText.show_case.title.t1;
            break;
        case '2':
            languageTitle = languageText.show_case.title.t2;
            break;
        case '3':
            languageTitle = languageText.show_case.title.t3;
            break;
        case '4':
            languageTitle = languageText.show_case.title.t4;
            break;
        default:
            languageTitle = '';
    }

    const openImageModal = (image: string, index: number) => {
        setShowModal(true);
        setModalImage(image);
        setModalIndex(index);

        document.body.classList.add('no-scroll');
    };

    const closeImageModal = () => {
        setShowModal(false);

        document.body.classList.remove('no-scroll');
    };

    return (
        <div className="p-3 flex flex-1 flex-col items-center space-y-10">
            <h1 className="text-left w-full font-bold text-2xl capitalize">{languageTitle}</h1>
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-10 !mt-0">
                    <div className="relative">
                        <Button onClick={closeImageModal} className="absolute top-0 right-0 p-3 text-white bg-black bg-opacity-50 hover:bg-opacity-75 focus:outline-none">X</Button>
                        <Image
                            src={modalImage}
                            alt={`${category} image ${modalIndex}`}
                            width={600}
                            height={900}
                            className="rounded-lg object-cover object-center"
                        />
                    </div>
                </div>
            )}
            <div className="max-w-[700px] flex flex-row flex-1 flex-wrap justify-center">
                {loading ? (<p>{languageText.show_case.loading}</p>) : (
                    <>
                        {images.length > 0 ? (
                            images.map((image, index) => (
                                <Image
                                    key={index}
                                    src={image}
                                    alt={`${category} image ${index}`}
                                    width={300}
                                    height={450}
                                    className="sm:hover:scale-150 sm:duration-500 rounded-lg mt-3 max-h-[350px] max-w-[200px] min-h-[350px] min-w-[200px] object-cover object-center m-3"
                                    onClick={() => openImageModal(image, index)}
                                />
                            ))
                        ) : (
                            <p>{languageText.show_case.subtitle}</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Showcase;