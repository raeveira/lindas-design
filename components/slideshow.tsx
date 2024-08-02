import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Slideshow = ({ images, index }: { images: string[], index: number }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const totalImages = images.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImage((current) => (current + 1) % totalImages);
    }, 7500);

    return () => clearTimeout(timer);
  }, [currentImage, totalImages]);

  return (
    <div className="relative scale- h-[calc(100vh-250px)] flex-1 overflow-hidden w-full pb-3">
      {images.map((image, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity flex justify-center items-center duration-3000 ${idx === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <Image
            src={image}
            alt={`Slide ${idx}`}
            className="object-center rounded-md mb-3 object-cover h-[calc(100vh-260px)]"
            loading="lazy"
            width={400}
            height={600}
          />
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
