'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import tr from '../translations/tr.json';
import en from '../translations/en.json';

type Translations = typeof tr;

interface LanguageContextType {
    locale: 'tr' | 'en';
    setLocale: (locale: 'tr' | 'en') => void;
    t: (path: string) => string;
}

const translations = { tr, en };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [locale, setLocale] = useState<'tr' | 'en'>('tr');

    useEffect(() => {
        const savedLocale = localStorage.getItem('locale') as 'tr' | 'en';
        if (savedLocale && (savedLocale === 'tr' || savedLocale === 'en')) {
            setLocale(savedLocale);
        }
    }, []);

    const handleSetLocale = (newLocale: 'tr' | 'en') => {
        setLocale(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    const t = (path: string): string => {
        const keys = path.split('.');
        let result: any = translations[locale];

        for (const key of keys) {
            if (result && result[key]) {
                result = result[key];
            } else {
                return path; // Fallback to path name if not found
            }
        }

        return result;
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
