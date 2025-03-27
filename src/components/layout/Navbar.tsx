
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  CalendarDays, 
  Heart, 
  GalleryHorizontal, 
  User, 
  Menu, 
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Heart size={18} /> },
    { name: 'Details', path: '/details', icon: <CalendarDays size={18} /> },
    { name: 'Gallery', path: '/gallery', icon: <GalleryHorizontal size={18} /> },
    { name: 'RSVP', path: '/rsvp', icon: <User size={18} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav 
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
          isScrolled ? 'bg-wedding-accent/50 backdrop-blur-md shadow-soft' : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className={cn("font-serif text-2xl font-medium transition-colors",
                location.pathname === '/'
                    ? 'text-wedding-primary'
                    : 'text-wedding-dark hover:text-wedding-primary'
            )}
          >
            Nihan & Ale Wedding
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex items-center gap-2 text-2l font-medium transition-colors link-underline',
                    location.pathname === '/'
                        ? 'text-wedding-primary'
                        : 'text-wedding-dark hover:text-wedding-primary',
                    location.pathname === link.path
                    ? 'text-wedding-primary' 
                    : '',
                    
                )}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            {isAuthenticated ? (
              <Button 
                variant="outline" 
                onClick={logout}
                className="text-wedding-primary hover:bg-wedding-primary hover:text-wedding-primary hover:bg-wedding-secondary/70 transition-all duration-300"
              >
                Sign Out
              </Button>
            ) : (
              <Link to="/rsvp">
                <Button 
                  variant="outline"
                  className="text-white bg-wedding-primary hover:text-wedding-primary hover:bg-wedding-secondary/70 transition-all duration-300"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-wedding-primary" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={cn(
          'fixed inset-0 z-40 bg-white/95 backdrop-blur-md flex flex-col justify-center items-center transition-transform duration-500 md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col items-center space-y-8 py-12">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'flex items-center gap-3 text-lg font-medium py-2 px-4 rounded-md transition-all',
                location.pathname === link.path 
                  ? 'text-wedding-primary bg-wedding-secondary/50' 
                  : 'text-wedding-dark hover:text-wedding-primary hover:bg-wedding-secondary/20'
              )}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}

          {isAuthenticated ? (
            <Button 
              variant="outline" 
              onClick={logout}
              className="w-full mt-4 border-wedding-primary text-wedding-primary hover:bg-wedding-primary hover:text-white"
            >
              Sign Out
            </Button>
          ) : (
            <Link to="/rsvp" className="w-full mt-4">
              <Button 
                variant="outline"
                className="w-full border-wedding-primary text-wedding-primary hover:bg-wedding-primary hover:text-white"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
