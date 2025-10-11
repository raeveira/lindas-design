'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {motion} from 'framer-motion';
import {cn} from "@/lib/utils";
import Image from "next/image";

type CarouselImage = {
    id?: string | number;
    url: string;
    alt?: string;
};

interface CarouselProps {
    images?: CarouselImage[];
    interval?: number;   // ms between slides
    delay?: number;      // ms before autoplay starts
    mobile?: boolean;  // if true, show on mobile, else hide
}

export const Carousel = ({
                             images,
                             interval = 5000,
                             delay = 0,
                             mobile = false
                         }: CarouselProps) => {
    const slides = useMemo(() => (images ?? []).filter(Boolean), [images]);
    const len = slides.length;

    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (len <= 1) return;
        let intervalId: ReturnType<typeof setInterval> | undefined;
        const startId = setTimeout(() => {
            intervalId = setInterval(() => setIndex((i) => (i + 1) % len), interval);
        }, Math.max(0, delay));

        return () => {
            if (intervalId) clearInterval(intervalId);
            clearTimeout(startId);
        };
    }, [len, interval, delay]);

    if (len === 0) return null;

    return (
        <div
            className={cn('relative w-full h-full overflow-hidden rounded-lg', mobile ? 'block' : 'hidden md:block')}
        >
            <motion.div
                className={'flex w-full h-full will-change-transform'}
                animate={{x: `-${index * 100}%`}}
                transition={{duration: 0.55, ease: 'easeInOut'}}
            >
                {slides.map((img, i) => (
                    <div
                        key={img.id ?? i}
                        className={'flex-[0_0_100%] flex w-full h-full overflow-hidden relative'}
                    >
                        <Image
                            src={img.url}
                            alt={img.alt ?? 'Slide image'}
                            fill
                            className={'w-full h-full object-cover'}
                            draggable={false}
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};
