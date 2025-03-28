
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close the menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3",
        isScrolled
          ? "bg-white shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="font-serif text-xl text-wedding-dark">
            Nihan <span className="text-wedding-primary">&</span> Ale
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={cn(
                "font-medium text-sm transition-colors",
                location.pathname === "/"
                  ? "text-wedding-primary"
                  : "text-wedding-dark hover:text-wedding-primary"
              )}
            >
              {t('common.home')}
            </Link>
            <Link
              to="/details"
              className={cn(
                "font-medium text-sm transition-colors",
                location.pathname === "/details"
                  ? "text-wedding-primary"
                  : "text-wedding-dark hover:text-wedding-primary"
              )}
            >
              {t('common.details')}
            </Link>
            <Link
              to="/gallery"
              className={cn(
                "font-medium text-sm transition-colors",
                location.pathname === "/gallery"
                  ? "text-wedding-primary"
                  : "text-wedding-dark hover:text-wedding-primary"
              )}
            >
              {t('common.gallery')}
            </Link>
            
            <div className="pl-4 flex items-center space-x-3">
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={toggleMenu}
              className="text-wedding-dark focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 flex flex-col space-y-3">
            <Link
              to="/"
              className={cn(
                "font-medium py-2 transition-colors",
                location.pathname === "/"
                  ? "text-wedding-primary"
                  : "text-wedding-dark hover:text-wedding-primary"
              )}
            >
              {t('common.home')}
            </Link>
            <Link
              to="/details"
              className={cn(
                "font-medium py-2 transition-colors",
                location.pathname === "/details"
                  ? "text-wedding-primary"
                  : "text-wedding-dark hover:text-wedding-primary"
              )}
            >
              {t('common.details')}
            </Link>
            <Link
              to="/gallery"
              className={cn(
                "font-medium py-2 transition-colors",
                location.pathname === "/gallery"
                  ? "text-wedding-primary"
                  : "text-wedding-dark hover:text-wedding-primary"
              )}
            >
              {t('common.gallery')}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
