'use client';
import React from 'react';
import { language } from '@/lib/data/language';

const NotFound = () => {
    const [languageText, setLanguageText] = React.useState(language.dutch);

    React.useEffect(() => {
        localStorage.getItem('language') === 'english' ? setLanguageText(language.english) : setLanguageText(language.dutch);
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <h1 className="font-bold text-xl">{languageText.not_found.title}</h1>
        </div>
    );
}

export default NotFound;