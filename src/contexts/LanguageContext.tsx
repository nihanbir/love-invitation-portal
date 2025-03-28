
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '@/locales/en';
import sv from '@/locales/sv';
import tr from '@/locales/tr';

// Define the available languages
export type Language = 'en' | 'sv' | 'tr';

// Define the shape of our language context
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

// Create a provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage ? savedLanguage : 'en';
  });

  // Store language preference in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translations object with all languages
  const translations = {
    en,
    sv,
    tr
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let translation: any = translations[language];

    for (const k of keys) {
      if (!translation[k]) {
        console.warn(`Translation key "${key}" not found in ${language} locale`);
        return key;
      }
      translation = translation[k];
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
