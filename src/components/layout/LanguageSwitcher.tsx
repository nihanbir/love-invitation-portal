
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sv' : 'en');
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className="text-sm bg-transparent border border-wedding-primary/40 text-wedding-primary hover:bg-wedding-primary/10"
    >
      {language === 'en' ? 'Svenska' : 'English'}
    </Button>
  );
};

export default LanguageSwitcher;
