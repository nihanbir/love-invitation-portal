
import React from 'react';
import Hero from '@/components/home/Hero';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Utensils } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import {
  WEDDING_DATE,
  WEDDING_DATE_TIME,
  WEDDING_VENUE,
  WEDDING_ADDRESS, CEREMONY_DETAILS, RECEPTION_DETAILS
} from '@/constants/wedding';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero 
          names={{ partner1: 'Nihan', partner2: 'Ale' }}
          date={WEDDING_DATE}
          location="Värmdö, Stockholm"
        />
        
        {/* About Section */}
        <section id="about-section" className="py-20 bg-white">
          <div className="container max-w-5xl mx-auto px-6">
            <AnimatedSection className="text-center mb-16" animation="fade-in">
              <h2 className="font-serif text-4xl text-wedding-dark mb-4">Our Story</h2>
              <div className="w-16 h-0.5 bg-wedding-primary mx-auto mb-8"></div>
              <p className="text-wedding-muted max-w-3xl mx-auto leading-relaxed">
                We are overjoyed to invite you to join us for our wedding celebration. Our journey began with a chance meeting at Forsberg's Skola, and we've been inseparable ever since. Through all of life's adventures, both big and small, we've built a partnership that we're excited to make official. We can't wait to celebrate this special day with our beloved family and friends.
              </p>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedSection animation="slide-up" delay={200}>
                <div className="rounded-lg overflow-hidden shadow-soft">
                  <img 
                    src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=1200" 
                    alt="Couple" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="slide-up" delay={400}>
                <h3 className="font-serif text-3xl text-wedding-dark mb-4">Our Vision</h3>
                <p className="text-wedding-muted mb-6 leading-relaxed">
                  We're creating a celebration that reflects our love story – elegant yet relaxed, thoughtful and joyful. Our hope is to create beautiful memories with the people who mean the most to us, and to begin this next chapter surrounded by love.
                </p>
                <Link to="/details">
                  <Button className="bg-wedding-primary hover:bg-wedding-accent/90 text-white transition-all">
                    Explore Details
                  </Button>
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </section>
        
        {/* Event Highlights */}
        <section className="py-20 bg-wedding-secondary/30">
          <div className="container max-w-6xl mx-auto px-6">
            <AnimatedSection className="text-center mb-16" animation="fade-in">
              <h2 className="font-serif text-4xl text-wedding-dark mb-4">Event Highlights</h2>
              <div className="w-16 h-0.5 bg-wedding-primary mx-auto mb-8"></div>
              <p className="text-wedding-muted max-w-3xl mx-auto">
                Here's everything you need to know about our special day. We've put together all the important details to help you plan and prepare.
              </p>
            </AnimatedSection>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimatedSection animation="scale-in" delay={200} className="bg-white rounded-lg p-8 shadow-soft transition-transform hover:translate-y-[-5px]">
                <div className="mb-6 flex justify-center">
                  <div className="w-14 h-14 bg-wedding-primary/10 rounded-full flex items-center justify-center">
                    <Calendar className="text-wedding-primary h-6 w-6" />
                  </div>
                </div>
                <h3 className="font-serif text-xl text-wedding-dark mb-2 text-center">Ceremony & Reception</h3>
                <p className="text-wedding-muted text-center text-sm">
                  {WEDDING_DATE}
                  <br />Ceremony: {CEREMONY_DETAILS.time}
                  <br />Reception: {RECEPTION_DETAILS.time}
                </p>
              </AnimatedSection>
              
              <AnimatedSection animation="scale-in" delay={300} className="bg-white rounded-lg p-8 shadow-soft transition-transform hover:translate-y-[-5px]">
                <div className="mb-6 flex justify-center">
                  <div className="w-14 h-14 bg-wedding-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="text-wedding-primary h-6 w-6" />
                  </div>
                </div>
                <h3 className="font-serif text-xl text-wedding-dark mb-2 text-center">Venue</h3>
                <p className="text-wedding-muted text-center text-sm">
                  Fredriksborg Hotell & Restaurang
                  <br />Fredriksborgsvägen 17
                  <br />139 90 Värmdö
                </p>
              </AnimatedSection>
              
              <AnimatedSection animation="scale-in" delay={400} className="bg-white rounded-lg p-8 shadow-soft transition-transform hover:translate-y-[-5px]">
                <div className="mb-6 flex justify-center">
                  <div className="w-14 h-14 bg-wedding-primary/10 rounded-full flex items-center justify-center">
                    <Utensils className="text-wedding-primary h-6 w-6" />
                  </div>
                </div>
                <h3 className="font-serif text-xl text-wedding-dark mb-2 text-center">Menu</h3>
                <p className="text-wedding-muted text-center text-sm">
                  TBA
                  <br />
                  <br />
                </p>
              </AnimatedSection>
              
              <AnimatedSection animation="scale-in" delay={500} className="bg-white rounded-lg p-8 shadow-soft transition-transform hover:translate-y-[-5px]">
                <div className="mb-6 flex justify-center">
                  <div className="w-14 h-14 bg-wedding-primary/10 rounded-full flex items-center justify-center">
                    <Users className="text-wedding-primary h-6 w-6" />
                  </div>
                </div>
                <h3 className="font-serif text-xl text-wedding-dark mb-2 text-center">Accommodations</h3>
                <p className="text-wedding-muted text-center text-sm">
                  We will be able to accommodate up to 30 guests at the wedding venue for the wedding night, with priority
                  given to those traveling from abroad.
                  <br />
                  <br />
                </p>
              </AnimatedSection>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/details">
                <Button variant="outline" className="bg-wedding-primary hover:bg-wedding-accent/90 hover:text-white text-white transition-all">
                  See Full Details
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* RSVP Banner */}
        <section className="py-24 bg-cover bg-center relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=2000)' }}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
          <div className="container max-w-5xl mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center" animation="fade-in">
              <h2 className="font-serif text-4xl text-white mb-4">Join Us On Our Special Day</h2>
              <div className="w-16 h-0.5 bg-wedding-primary mx-auto mb-8"></div>
              <p className="text-white/90 max-w-2xl mx-auto mb-10">
                We would be honored by your presence as we celebrate our love. Please let us know if you'll be joining us by completing the RSVP form.
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
