import * as React from 'react';
import { fetchImages } from '@/lib/api/fetch-images';
import { language } from '@/lib/data/language';

const Showcase = ({ category, title }: { category: string; title: number }) => {
    const [images, setImages] = React.useState<string[]>([]);
    const [languageText, setLanguageText] = React.useState(language.dutch);
    const [loading, setLoading] = React.useState(true); // Loading state

    React.useEffect(() => {
        localStorage.getItem('language') === 'english' ? setLanguageText(language.english) : setLanguageText(language.dutch);
    }, []);

    React.useEffect(() => {
        const getImages = async () => {
            try {
                const data = await fetchImages({ category });
                const watermarkedImages = await Promise.all(data.map(image => addTextWatermark(image)));
                setImages(watermarkedImages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching or processing images:', error);
                setLoading(false);
            }
        };

        getImages();
    }, [category]);

    // Function to add text watermark to image
    const addTextWatermark = async (imageUrl: string) => {
        return new Promise<string>((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
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

                // Debugging: log canvas dimensions
                console.log('Canvas dimensions:', canvas.width, canvas.height);

                ctx.font = '20px Arial';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.fillText('lindas-design', 10, canvas.height - 10);

                const watermarkedImageUrl = canvas.toDataURL();

                // Debugging: log watermarked image URL
                console.log('Watermarked image URL:', watermarkedImageUrl);

                resolve(watermarkedImageUrl);
            };

            img.onerror = (error) => {
                reject(error);
            };

            img.src = imageUrl;
        });
    };

    let languageTitle = "";

    switch (title) {
        case 1:
            languageTitle = languageText.show_case.title.t1;
            break;
        case 2:
            languageTitle = languageText.show_case.title.t2;
            break;
        case 3:
            languageTitle = languageText.show_case.title.t3;
            break;
        case 4:
            languageTitle = languageText.show_case.title.t4;
            break;
        default:
            languageTitle = "";
    }

    return (
        <div className="p-3 flex flex-1 flex-col items-center space-y-10">
            <h1 className="text-left w-full font-bold text-2xl capitalize">{languageTitle}</h1>
            <div className="sm:w-4/6 flex flex-row flex-1 flex-wrap justify-center">
                {loading ? (
                    <p>{languageText.language.title === 'Nederlands' ? 'Afbeeldingen laden...' : 'Loading images...'}</p>
                ) : images.length > 0 ? (
                    images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`${category} image ${index}`}
                            width={300}
                            height={450}
                            className='sm:hover:scale-150 sm:duration-500 rounded-lg mt-3 max-h-[350px] max-w-[200px] min-h-[350px] min-w-[200px] object-cover object-center m-3'
                        />
                    ))
                ) : (
                    <p>{languageText.show_case.subtitle}</p>
                )}
            </div>
        </div>
    );
};

export default Showcase;
