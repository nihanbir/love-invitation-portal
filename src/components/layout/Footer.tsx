
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wedding-secondary/30 border-t border-wedding-accent/20 py-12">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <Link 
              to="/" 
              className="font-serif text-2xl text-wedding-dark font-medium transition-colors hover:text-wedding-primary"
            >
              Nihan & Ale Wedding
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <Link 
              to="/" 
              className="text-sm text-wedding-dark hover:text-wedding-primary transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/details" 
              className="text-sm text-wedding-dark hover:text-wedding-primary transition-colors"
            >
              Details
            </Link>
            <Link 
              to="/gallery" 
              className="text-sm text-wedding-dark hover:text-wedding-primary transition-colors"
            >
              Gallery
            </Link>
            <Link 
              to="/rsvp" 
              className="text-sm text-wedding-dark hover:text-wedding-primary transition-colors"
            >
              RSVP
            </Link>
          </div>
          
          <div className="flex items-center justify-center mb-4">
            <Heart size={16} className="text-wedding-primary mr-2" />
            <p className="text-sm text-wedding-muted">
              Made with love for our special day
            </p>
          </div>
          
          <p className="text-xs text-wedding-muted text-center">
            © {currentYear} Nihan Bir & Ale Flärd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
