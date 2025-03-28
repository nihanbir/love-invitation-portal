import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AnimatedSection from '@/components/shared/AnimatedSection';

interface RSVPBannerProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  backgroundImage?: string;
}

const RSVPBanner: React.FC<RSVPBannerProps> = ({
                                                 title,
                                                 subtitle,
                                                 buttonText = "RSVP Now",
                                                 backgroundImage = "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=2000"
                                               }) => {
  return (
      <section className="py-16 bg-cover bg-center relative" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        <div className="container max-w-4xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center" animation="fade-in">
            <h2 className="font-serif text-3xl text-white mb-4">{title}</h2>
            <div className="w-12 h-0.5 bg-wedding-primary mx-auto mb-6"></div>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              {subtitle}
            </p>
              <Link
                  to="https://tally.so/r/3NPJPW"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                  <Button size="lg" className="bg-wedding-primary hover:bg-wedding-accent/90 text-white transition-all px-8 py-6 rounded-md">
                      RSVP Now
                  </Button>
              </Link>
          </AnimatedSection>
        </div>
      </section>
  );
};

export default RSVPBanner;