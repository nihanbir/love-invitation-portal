
import React from 'react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Hotel, 
  Car, 
  Utensils, 
  Music, 
  Gift
} from 'lucide-react';
import RSVPBanner from '@/components/shared/RSVPBanner';
import WeddingDetailsCard from '@/components/shared/WeddingDetailsCard';
import {
  WEDDING_DATE,
  CEREMONY_DETAILS,
  RECEPTION_DETAILS,
  ACCOMMODATIONS, WEDDING_ADDRESS
} from '@/constants/wedding';

const Details = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="py-20 bg-wedding-secondary/30">
          <div className="container max-w-5xl mx-auto px-6">
            <AnimatedSection className="text-center" animation="fade-in">
              <h1 className="font-serif text-5xl text-wedding-dark mb-4">Wedding Details</h1>
              <div className="w-16 h-0.5 bg-wedding-primary mx-auto mb-8"></div>
              <p className="text-wedding-muted max-w-3xl mx-auto">
                We are so excited to celebrate our special day with you. Below you'll find all the important information to help you prepare for our wedding.
              </p>
            </AnimatedSection>
          </div>
        </section>
        
        {/* Schedule */}
        <section className="py-16 bg-white">
          <div className="container max-w-5xl mx-auto px-6">
            <AnimatedSection className="text-center mb-12" animation="fade-in">
              <h2 className="font-serif text-3xl text-wedding-dark mb-4">Schedule of Events</h2>
              <div className="w-12 h-0.5 bg-wedding-primary mx-auto mb-8"></div>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-2 gap-12">
              <AnimatedSection animation="slide-up" delay={200}>
                <div className="bg-wedding-secondary/20 rounded-lg p-8 shadow-soft relative overflow-hidden">
                  <WeddingDetailsCard
                      title="The Ceremony"
                      icon={<Calendar className="text-wedding-primary h-5 w-5" />}
                      description={CEREMONY_DETAILS.description}
                      items={[
                        {
                          icon: <Clock className="h-5 w-5" />,
                          title: CEREMONY_DETAILS.time,
                          description: `Saturday, ${CEREMONY_DETAILS.date}`
                        },
                        {
                          icon: <MapPin className="h-5 w-5" />,
                          title: CEREMONY_DETAILS.venue,
                          description: CEREMONY_DETAILS.address
                        }
                      ]}
                  />
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="slide-up" delay={400}>
                <div className="bg-wedding-secondary/20 rounded-lg p-8 shadow-soft relative overflow-hidden">
                  <WeddingDetailsCard
                      title="The Reception"
                      icon={<Calendar className="text-wedding-primary h-5 w-5" />}
                      description={RECEPTION_DETAILS.description}
                      items={[
                        {
                          icon: <Clock className="h-5 w-5" />,
                          title: RECEPTION_DETAILS.time,
                          description: `Saturday, ${RECEPTION_DETAILS.date}`
                        },
                        {
                          icon: <MapPin className="h-5 w-5" />,
                          title: RECEPTION_DETAILS.venue,
                          description: RECEPTION_DETAILS.address
                        }
                      ]}
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
        
        {/* Accomodations */}
        <section className="py-16 bg-wedding-secondary/20">
          <div className="container max-w-5xl mx-auto px-6">
            <AnimatedSection className="text-center mb-12" animation="fade-in">
              <h2 className="font-serif text-3xl text-wedding-dark mb-4">Accommodations & Travel</h2>
              <div className="w-12 h-0.5 bg-wedding-primary mx-auto mb-8"></div>
              <p className="text-wedding-muted max-w-3xl mx-auto">
                We have reserved the entire hotel for our wedding, and all 15 double-bed rooms, including breakfast, 
                are complimentary for the wedding night. This allows us to accommodate up to 30 guests, with priority 
                given to those traveling from abroad.
              </p>
            </AnimatedSection>
            
            <div className="space-y-8">
              <AnimatedSection animation="fade-in" delay={200}>
                <div className="bg-white rounded-lg p-8 shadow-soft">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="md:w-1/4 flex justify-center md:justify-start">
                      <div className="w-16 h-16 bg-wedding-primary/10 rounded-full flex items-center justify-center">
                        <Hotel className="text-wedding-primary h-8 w-8" />
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <div>
                        <h3 className="font-serif text-2xl text-wedding-dark mb-4">{ACCOMMODATIONS.name}</h3>
                        <div className="flex items-start">
                          <div className="space-y-4">
                            <p className="text-wedding-muted mb-4">
                              Each room features a private bathroom and a comfortable double bed. Please let us know if you have any special requests.
                            </p>
                            {/* Check-in, Check-out */}
                            <div className="flex items-start gap-3">
                              <div className="text-wedding-primary h-5 w-5 mt-1 mr-3 flex-shrink-0">
                                <Clock className="text-wedding-primary h-8 w-8" />
                              </div>
                              <div>
                                <p className="font-medium">Check-in</p>
                                <p className="text-wedding-muted text-sm">{WEDDING_DATE}</p>
                                <p className="text-wedding-muted text-sm">{ACCOMMODATIONS.checkin}</p>
                              </div>
                              <div className="text-wedding-primary h-5 w-5 mt-1 mr-3 flex-shrink-0">
                                <Clock className="text-wedding-primary h-8 w-8" />
                              </div>
                              <div>
                                <p className="font-medium">Check-out</p>
                                <p className="text-wedding-muted text-sm">July 20 2025</p>
                                <p className="text-wedding-muted text-sm">{ACCOMMODATIONS.checkout}</p>
                              </div>
                            </div>
                            {/* Breakfast */}
                            <div className="flex items-start gap-3">
                              <div className="text-wedding-primary h-5 w-5 mt-1 mr-3 flex-shrink-0">
                                <Clock className="text-wedding-primary h-8 w-8" />
                              </div>
                              <div>
                                <p className="font-medium">Breakfast</p>
                                <p className="text-wedding-muted text-sm">July 20 2025</p>
                                <p className="text-wedding-muted text-sm">{ACCOMMODATIONS.breakfast}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-in" delay={300}>
                <div className="bg-white rounded-lg p-8 shadow-soft">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="md:w-1/4 flex justify-center md:justify-start">
                      <div className="w-16 h-16 bg-wedding-primary/10 rounded-full flex items-center justify-center">
                        <Car className="text-wedding-primary h-8 w-8" />
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="font-serif text-xl text-wedding-dark mb-2">Transportation</h3>
                      <p className="text-wedding-muted mb-4">
                        TBA
                      </p>
                      <p className="text-wedding-muted">
                        For guests driving to the venue, complimentary parking will be available.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
        
        {/* Menu */}
        <section className="py-16 bg-white">
          <div className="container max-w-5xl mx-auto px-6">
            <AnimatedSection className="text-center mb-12" animation="fade-in">
              <h2 className="font-serif text-3xl text-wedding-dark mb-4">Menu & Entertainment</h2>
              <div className="w-12 h-0.5 bg-wedding-primary mx-auto mb-8"></div>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-2 gap-12">
              <AnimatedSection animation="slide-up" delay={200}>
                <div className="bg-wedding-secondary/20 rounded-lg p-8 shadow-soft relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-wedding-primary/10 rounded-bl-lg flex items-center justify-center">
                    <Utensils className="text-wedding-primary h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-2xl text-wedding-dark mb-4">Dining Experience</h3>
                  <p className="text-wedding-muted mb-6">
                    Our reception will feature a seasonal farm-to-table menu. Dietary restrictions can be accommodated with advance notice.
                  </p>
                  <h4 className="font-serif text-lg text-wedding-dark mb-2">Menu Preview</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-wedding-primary rounded-full mt-2 mr-2"></div>
                      <div>
                        <p className="font-medium">First Course</p>
                        <p className="text-wedding-muted text-sm"></p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-wedding-primary rounded-full mt-2 mr-2"></div>
                      <div>
                        <p className="font-medium">Main Course</p>
                        <p className="text-wedding-muted text-sm"></p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-wedding-primary rounded-full mt-2 mr-2"></div>
                      <div>
                        <p className="font-medium">Dessert</p>
                        <p className="text-wedding-muted text-sm"></p>
                      </div>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="slide-up" delay={400}>
                <div className="bg-wedding-secondary/20 rounded-lg p-8 shadow-soft relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-wedding-primary/10 rounded-bl-lg flex items-center justify-center">
                    <Music className="text-wedding-primary h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-2xl text-wedding-dark mb-4">Entertainment</h3>
                  <p className="text-wedding-muted mb-6">
                    We've planned a wonderful evening of music and celebration for all our guests to enjoy.
                  </p>
                  <h4 className="font-serif text-lg text-wedding-dark mb-2">Schedule</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-wedding-primary rounded-full mt-2 mr-2"></div>
                      <div>
                        <p className="font-medium">Ceremony ({CEREMONY_DETAILS.time} - 17:00)</p>
                        <p className="text-wedding-muted text-sm">String quartet playing classical music</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-wedding-primary rounded-full mt-2 mr-2"></div>
                      <div>
                        <p className="font-medium">Dinner ({RECEPTION_DETAILS.time} - 21:00)</p>
                        <p className="text-wedding-muted text-sm">Soft background jazz ensemble, speeches</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-wedding-primary rounded-full mt-2 mr-2"></div>
                      <div>
                        <p className="font-medium">Dancing (21:00 - 12:30)</p>
                        <p className="text-wedding-muted text-sm">Dancing at the historical castle</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
        
        {/* Registry */}
        <section className="py-16 bg-wedding-secondary/30">
          <div className="container max-w-4xl mx-auto px-6">
            <AnimatedSection className="text-center" animation="fade-in">
              <div className="w-16 h-16 bg-wedding-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="text-wedding-primary h-8 w-8" />
              </div>
              <h2 className="font-serif text-3xl text-wedding-dark mb-4">Registry</h2>
              <div className="w-12 h-0.5 bg-wedding-primary mx-auto mb-6"></div>
              <p className="text-wedding-muted max-w-3xl mx-auto mb-8">
                Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we've registered at the following places:
              </p>
              <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
                <Button 
                  variant="outline" 
                  className="border-wedding-primary text-wedding-primary hover:bg-wedding-primary hover:text-white transition-all py-6"
                >
                  Amazon Registry
                </Button>
                <Button 
                  variant="outline" 
                  className="border-wedding-primary text-wedding-primary hover:bg-wedding-primary hover:text-white transition-all py-6"
                >
                  Crate & Barrel
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
        
        {/* RSVP Banner */}
        <RSVPBanner
            title="Ready to Join Us?"
            subtitle={`Please let us know if you'll be able to attend by June 30, 2025. We look forward to celebrating with you!`}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Details;
