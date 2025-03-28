
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import enTranslations from '../locales/en';
import svTranslations from '../locales/sv';

export type Language = 'en' | 'sv';

type Translations = {
  [key: string]: any;
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations: Record<Language, Translations> = {
  en: enTranslations,
  sv: svTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get the language from localStorage, default to 'en'
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  useEffect(() => {
    // Save the language preference to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // Fallback to English if the key doesn't exist in the current language
        let fallbackValue = translations['en'];
        for (const fallbackKey of keys) {
          if (fallbackValue && fallbackValue[fallbackKey]) {
            fallbackValue = fallbackValue[fallbackKey];
          } else {
            return key; // Return the key if it doesn't exist in any language
          }
        }
        return typeof fallbackValue === 'string' ? fallbackValue : key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
