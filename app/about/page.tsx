'use client'
import React from 'react';
import Image from 'next/image';
import { language } from '@/lib/data/language';

const AboutPage: React.FC = () => {

    const [languageText, setLanguageText] = React.useState(language.dutch);
    
    React.useEffect(() => {
        localStorage.getItem('language') === 'english' ? setLanguageText(language.english) : setLanguageText(language.dutch);
    }, []);

    return (
        <div className='flex flex-row-reverse max-w-full text-wrap p-3 pr-5 max-sm:flex-col max-sm:space-y-3'>
            <div className='p-3 leading-7 space-y-3 overflow-auto sm:max-h-[615px]'>
                <p>{languageText.about_me.p1}</p>
                <p>{languageText.about_me.p2}</p>
                <p>{languageText.about_me.p3}</p>
                <p>{languageText.about_me.p4}</p>
                <p>{languageText.about_me.p5}</p>
                <p>{languageText.about_me.p6}</p>
                <p>{languageText.about_me.p7}</p>
                <p className='pt-2 font-semibold'>{languageText.about_me.p8}</p>
            </div>
            <Image src={'/selfie.png'} alt={'foto linda'} width={365} height={500} priority className='rounded-2xl h-[500px] w-[365px]' />
        </div>
    );
};

export default AboutPage;