import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en';
import sv from '../locales/sv';
import tr from '../locales/tr';

export type Language = 'en' | 'sv' | 'tr';

// Define the shape of our translations
type TranslationsType = typeof en;

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string, params?: Record<string, string>) => string;
}

const translations: Record<Language, TranslationsType> = {
    en,
    sv,
    tr
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
        return savedLanguage || 'en';
    });

    useEffect(() => {
        localStorage.setItem('preferredLanguage', language);
    }, [language]);

    const setLanguage = (newLanguage: Language) => {
        setLanguageState(newLanguage);
    };

    const t = (key: string, params?: Record<string, string>) => {
        const keys = key.split('.');
        let value: any = translations[language];

        for (const k of keys) {
            if (!value || typeof value !== 'object') return key;
            value = value[k as keyof typeof value];
        }

        if (typeof value !== 'string') return key;

        let result = value;

        if (params) {
            Object.entries(params).forEach(([paramKey, paramValue]) => {
                result = result.replace(`{${paramKey}}`, paramValue);
            });
        }

        return result;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
