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
                date='7/17/2022'
                name='Joyce Christis'
                stars={5}
                content={languageData.reviews.r1.title}
                image='https://lh3.googleusercontent.com/a/ACg8ocKPma7I17032CHbItxFz5O6kgHBi2JeprT1JvSUs1wSx3JQ=w60-h60-p-rp-mo-br100'
                locale={locale}
            />
            <ReviewCard
                date='7/17/2023'
                name='Sanne Backes'
                stars={5}
                content={languageData.reviews.r2.title}
                image='https://lh3.googleusercontent.com/a-/ALV-UjVSC94XQjdb6S7AwK3QGS2z9qI1Q0PGGc8IfTrFhoIIoLtxT3s7=w60-h60-p-rp-mo-br100'
                locale={locale}
            />
            <ReviewCard
                date='7/17/2023'
                name='Iedje Kool'
                stars={5}
                content={languageData.reviews.r3.title}
                image='https://lh3.googleusercontent.com/a-/ALV-UjVSWYqGcsAD95cxB20C-w4gktGh5hgLEd1rG0nmwLkfcDLzKv-f8w=w60-h60-p-rp-mo-br100'
                locale={locale}
            />
            <ReviewCard
                date='7/17/2021'
                name='yvon h.'
                stars={5}
                content={languageData.reviews.r4.title}
                image='https://lh3.googleusercontent.com/a-/ALV-UjV3U8D75cdjw8F-K0NXnp55OmRDL-l3lgDhE6K5piTrn-plqCy5=w60-h60-p-rp-mo-br100'
                locale={locale}
            />
            <ReviewCard
                date='7/17/2023'
                name='Resie Kohlen'
                stars={5}
                content={languageData.reviews.r5.title}
                image='https://lh3.googleusercontent.com/a/ACg8ocKC7yKD919yw-PMeg5KuQr-Cy8SkRaBZfmQqNna_sndbvpK=w60-h60-p-rp-mo-br100'
                locale={locale}
            />
            <ReviewCard
                date='7/17/2023'
                name='Danielle Kres'
                stars={5}
                content={languageData.reviews.r6.title}
                image='https://lh3.googleusercontent.com/a/ACg8ocLTJ-uqjiVNcbVUKNXsqLKywPUVRaaSwZHaYidLdviBWGNEEA=w60-h60-p-rp-mo-br100'
                locale={locale}
            />
            <ReviewCard
                date='7/17/2021'
                name='Leila Heijl'
                stars={5}
                content={languageData.reviews.r7.title}
                image='https://lh3.googleusercontent.com/a-/ALV-UjUMXLmW0qHBBHIqk1vvLwSdPAGECN2GSbbxuj2yltX4Mtnxx1QRFg=w60-h60-p-rp-mo-br100'
                locale={locale}
            />
            <ReviewCard
                date='7/17/2018'
                name='Resie Kohlen'
                stars={5}
                content={languageData.reviews.r8.title}
                image='https://lh3.googleusercontent.com/a-/ALV-UjXoOtTHjsucQ4cwYyUSuzbkMxGBa7fFgbEPLX52cym2YfdHqdXi4A=w60-h60-p-rp-mo-br100'
                locale={locale}
            />
            <ReviewCard
                date='7/17/2018'
                name='mariska v. L'
                stars={5}
                content={languageData.reviews.r9.title}
                image='https://lh3.googleusercontent.com/a/ACg8ocIqVakIrdqwnBSRanSqBf8BFGxCNqmTQ7Ku0j7Qq7tFcihq-g=w60-h60-p-rp-mo-br100'
                locale={locale}
            />
            <ReviewCard
                date='7/17/2020'
                name='Claudia De Jong'
                stars={5}
                content={languageData.reviews.r10.title}
                image='https://lh3.googleusercontent.com/a/ACg8ocJ_BzelGgsqNsUJM-GWG9Zgf7Nz1Ft2l8MrtlbtU9A8U5ur8Q=w60-h60-p-rp-mo-br100'
                locale={locale}
            />
        </div>
    )
}

export default ReviewsPage;
