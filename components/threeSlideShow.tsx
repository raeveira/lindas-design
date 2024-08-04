import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicSlideshow = dynamic(() => import('@/components/slideshow'), {
    suspense: true,
});

const ThreeSlideshows = () => {
    let slideshows: { images: string[] }[] = [];

    if (window.innerWidth < 640) slideshows = [
        { images: ['/slideshow/slide1_1.jpg', '/slideshow/slide1_2.jpg'] }
    ];

    if (window.innerWidth < 1024) slideshows = [
        { images: ['/slideshow/slide1_1.jpg', '/slideshow/slide1_2.jpg'] },
        { images: ['/slideshow/slide2_1.jpg', '/slideshow/slide2_2.jpg'] }
    ];

    if (window.innerWidth >= 1024) slideshows = [
        { images: ['/slideshow/slide1_1.jpg', '/slideshow/slide1_2.jpg'] },
        { images: ['/slideshow/slide2_1.jpg', '/slideshow/slide2_2.jpg'] },
        { images: ['/slideshow/slide3_1.jpg', '/slideshow/slide3_2.jpg'] },
    ];

    return (
        <div className="flex space-x-4 w-full h-full max-sm:flex-col max-sm:space-x-0 max-sm:space-y-4">
            {slideshows.map((slideshow, index) => (
                <div
                    key={index}
                    className={`relative flex w-1/3 h-max ${index === 0 ? 'max-sm:w-full max-sm:h-max max-md:w-full max-md:h-max' : index === 1 ? 'max-sm:hidden max-md:w-full max-md:h-max' : 'max-sm:hidden max-md:hidden'}`}
                >
                    <Suspense fallback={<div>Loading slideshow...</div>}>
                        <DynamicSlideshow images={slideshow.images} index={index} />
                    </Suspense>
                </div>
            ))}
        </div>
    );
};

export default ThreeSlideshows;
