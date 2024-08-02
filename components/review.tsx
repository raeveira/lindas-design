import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { nl, enUS } from 'date-fns/locale';

interface CardProps {
    name: string;
    content: string;
    image: string;
    date: string;
    stars: number;
    locale: 'nl' | 'enUS';
}

type Locale = typeof nl | typeof enUS | undefined;

const ReviewCard: React.FC<CardProps> = ({ name, content, date, image, stars, locale }) => {
    const fullStars = Math.floor(stars);
    const hasHalfStar = stars % 1 !== 0;
    const starFill = stars - fullStars;
    const formattedLocale: Locale = locale === 'nl' ? nl : enUS;

    const parsedDate = new Date(date);
    const formattedDate = formatDistanceToNow(parsedDate, { locale: formattedLocale, addSuffix: true });

    return (
        <div className="container border-solid border-2 w-full m-2 p-3 flex flex-col space-y-3">
            <div className="mr-3 flex space-x-2">
                <img src={image} alt={`profile photo of ${name}`} height={25} width={25} className='rounded-full h-[25px] w-[25px] object-cover' />
                <h3 className='font-semibold'>{name}</h3>
            </div>
            <div className="flex-1">
                <p>{content}</p>
            </div>
            <div className='text-xs flex'>
                <p className='w-1/2'>{formattedDate}</p>
                <div className='flex w-1/2 justify-end'>
                    {Array.from({ length: fullStars }, (_, index) => (
                        <Star key={`star-full-${index}`} size={18} fill="#FFD700" />
                    ))}
                    {hasHalfStar && !starFill && <StarHalf key="star-half" size={18} fill="#FFD700" />}
                    {starFill > 0 && (
                        <div className="relative">
                            {hasHalfStar ? <StarHalf key="star-half" size={18} fill="#FFD700" /> : <Star key="star-fill" size={18} fill="#FFD700" style={{ clipPath: `inset(0 ${100 - starFill * 100}% 0 0)` }} />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
