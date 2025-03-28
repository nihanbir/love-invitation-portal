
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const getLanguageName = (lang: Language) => {
    switch (lang) {
      case 'en': return 'English';
      case 'sv': return 'Svenska';
      case 'tr': return 'Türkçe';
      default: return 'English';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-sm bg-transparent border border-wedding-primary/40 text-wedding-primary hover:bg-wedding-primary/10"
        >
          {getLanguageName(language)}
          <ChevronDown size={16} className="ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('sv')}>Svenska</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('tr')}>Türkçe</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
