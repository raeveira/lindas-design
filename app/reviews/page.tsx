'use client';
import React from 'react';
import ReviewCard from '@/components/review';
import { language } from '@/lib/data/language';

const ReviewsPage = () => {
    const [locale, setLocale] = React.useState<'nl' | 'enUS'>('nl');
    const [languageData, setLanguageData] = React.useState(language.dutch);

    React.useEffect(() => {
        localStorage.getItem('language') === 'english' ? setLocale('enUS') : setLocale('nl');
        localStorage.getItem('language') === 'english' ? setLanguageData(language.english) : setLanguageData(language.dutch);
    }, []);



    return (
        <div className="p-3 px-10 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ReviewCard
                name='Joyce Christis'
                stars={5}
                content={languageData.reviews.r1.title}
                images={[{ src: 'https://lh3.googleusercontent.com/p/AF1QipMpGGXSBASGNmCcBRyNEphRyjeZETBSVFoA-Ms=s3840-w3840-h1822' }]}
            />
            <ReviewCard
                name='Iedje Kool'
                stars={5}
                content={languageData.reviews.r3.title}
            />
            <ReviewCard
                name='yvon h.'
                stars={5}
                content={languageData.reviews.r4.title}
            />
            <ReviewCard
                name='Resie Kohlen'
                stars={5}
                content={languageData.reviews.r5.title}
            />
            <ReviewCard
                name='Danielle Kres'
                stars={5}
                content={languageData.reviews.r6.title}
            />
            <ReviewCard
                name='Sanne Backes'
                stars={5}
                content={languageData.reviews.r2.title}
                images={[{ src: '/sanne.jpg' }]}
            />
            <ReviewCard
                name='Leila Heijl'
                stars={5}
                content={languageData.reviews.r7.title}
            />
            <ReviewCard
                name='Dolores Salcedo'
                stars={5}
                content={languageData.reviews.r8.title}
            />
            <ReviewCard
                name='mariska v. L'
                stars={5}
                content={languageData.reviews.r9.title}
            />
            <ReviewCard
                name='Claudia De Jong'
                stars={5}
                content={languageData.reviews.r10.title}
            />
        </div>
    )
}

export default ReviewsPage;
