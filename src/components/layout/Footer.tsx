
import React from 'react';
import { Instagram, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-wedding-dark text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Info */}
          <div>
            <h3 className="font-serif text-2xl mb-4">Nihan & Ale</h3>
            <p className="text-white/80 max-w-xs">
              {t('common.welcomeMessage')}
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-lg mb-4">{t('common.details')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <Link to="/details" className="text-white/80 hover:text-white transition-colors">
                  {t('common.details')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/80 hover:text-white transition-colors">
                  {t('common.gallery')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-medium text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-wedding-primary" />
                <a href="mailto:nihan.bir@gmail.com" className="text-white/80 hover:text-white transition-colors">nihan.bir@gmail.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-wedding-primary" />
                <span className="text-white/80">+46707314374</span>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                >
                  <Instagram size={16} className="text-wedding-primary" />
                  <span>@nihanale</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Nihan & Ale. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
