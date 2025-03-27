
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import { toast } from 'sonner';
import { Send, Lock, User } from 'lucide-react';

interface GuestInfo {
  attending: string;
  numberOfGuests: number;
  guestNames: string;
  dietaryRestrictions: string;
  songRequests: string;
  accommodations: string[];
}

const defaultGuestInfo: GuestInfo = {
  attending: '',
  numberOfGuests: 1,
  guestNames: '',
  dietaryRestrictions: '',
  songRequests: '',
  accommodations: [],
};

const Rsvp = () => {
  const { user, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [guestInfo, setGuestInfo] = useState<GuestInfo>(defaultGuestInfo);
  const [submitted, setSubmitted] = useState(false);
  const [hasExistingRsvp, setHasExistingRsvp] = useState(false);
  
  // In a real app, you would fetch the RSVP data from a database
  useEffect(() => {
    if (isAuthenticated && user) {
      // Simulate fetching existing RSVP data
      const mockHasRsvp = localStorage.getItem(`rsvp-${user.id}`);
      if (mockHasRsvp) {
        setHasExistingRsvp(true);
        setGuestInfo(JSON.parse(mockHasRsvp));
      }
    }
  }, [isAuthenticated, user]);
  
  const handleChange = (field: keyof GuestInfo, value: string | number | string[]) => {
    setGuestInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleCheckboxChange = (value: string) => {
    const updatedAccommodations = [...guestInfo.accommodations];
    
    if (updatedAccommodations.includes(value)) {
      handleChange(
        'accommodations',
        updatedAccommodations.filter(item => item !== value)
      );
    } else {
      handleChange('accommodations', [...updatedAccommodations, value]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    
    if (guestInfo.attending === '') {
      toast.error('Please select whether you will be attending');
      return;
    }
    
    // In a real app, you would send the data to a server
    if (user) {
      localStorage.setItem(`rsvp-${user.id}`, JSON.stringify(guestInfo));
    }
    
    toast.success(
      hasExistingRsvp 
        ? 'Your RSVP has been updated. Thank you!' 
        : 'Your RSVP has been submitted. Thank you!'
    );
    
    setSubmitted(true);
    setHasExistingRsvp(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="py-20 bg-wedding-secondary/30">
          <div className="container max-w-5xl mx-auto px-6">
            <AnimatedSection className="text-center" animation="fade-in">
              <h1 className="font-serif text-5xl text-wedding-dark mb-4">RSVP</h1>
              <div className="w-16 h-0.5 bg-wedding-primary mx-auto mb-8"></div>
              <p className="text-wedding-muted max-w-3xl mx-auto">
                Please let us know if you'll be joining us on our special day. We kindly request your response by June 30, 2025.
              </p>
            </AnimatedSection>
          </div>
        </section>
        
        {/* RSVP Form */}
        <section className="py-16 bg-white">
          <div className="container max-w-3xl mx-auto px-6">
            {!isAuthenticated ? (
              <AnimatedSection className="text-center py-8 bg-wedding-secondary/20 rounded-lg shadow-soft" animation="fade-in">
                <div className="w-16 h-16 bg-wedding-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="text-wedding-primary h-8 w-8" />
                </div>
                <h2 className="font-serif text-2xl text-wedding-dark mb-4">Sign In to RSVP</h2>
                <p className="text-wedding-muted max-w-xl mx-auto mb-8">
                  Please sign in or create an account to submit your RSVP. This allows you to update your response later if needed.
                </p>
                <Button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-wedding-primary hover:bg-wedding-accent/90 text-white transition-all"
                >
                  <User className="mr-2 h-4 w-4" />
                  Sign In / Register
                </Button>
              </AnimatedSection>
            ) : (
              <AnimatedSection animation="fade-in">
                <div className="bg-white rounded-lg shadow-soft border border-wedding-accent/10 p-8">
                  {submitted && (
                    <div className="bg-wedding-secondary/30 rounded-lg p-6 mb-8 text-center">
                      <h3 className="font-serif text-xl text-wedding-dark mb-2">Thank You!</h3>
                      <p className="text-wedding-muted">
                        Your RSVP has been {hasExistingRsvp ? 'updated' : 'submitted'}. We're looking forward to celebrating with you!
                      </p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="font-serif text-xl text-wedding-dark">Will you be attending?</h3>
                      <RadioGroup 
                        value={guestInfo.attending} 
                        onValueChange={(value) => handleChange('attending', value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="attending-yes" />
                          <Label htmlFor="attending-yes">Yes, I'll be there</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="attending-no" />
                          <Label htmlFor="attending-no">No, I can't make it</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="maybe" id="attending-maybe" />
                          <Label htmlFor="attending-maybe">Maybe, I'll confirm later</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {guestInfo.attending === 'yes' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="numberOfGuests">Number of Guests (including yourself)</Label>
                          <Input 
                            id="numberOfGuests" 
                            type="number"
                            min="1"
                            max="5"
                            value={guestInfo.numberOfGuests}
                            onChange={(e) => handleChange('numberOfGuests', parseInt(e.target.value) || 1)}
                            className="border-wedding-primary/20 focus:border-wedding-primary"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="guestNames">Guest Names</Label>
                          <Textarea 
                            id="guestNames" 
                            placeholder="Please list the names of all guests in your party"
                            value={guestInfo.guestNames}
                            onChange={(e) => handleChange('guestNames', e.target.value)}
                            className="border-wedding-primary/20 focus:border-wedding-primary"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="dietaryRestrictions">Dietary Restrictions or Allergies</Label>
                          <Textarea 
                            id="dietaryRestrictions" 
                            placeholder="Please list any dietary restrictions or allergies we should be aware of"
                            value={guestInfo.dietaryRestrictions}
                            onChange={(e) => handleChange('dietaryRestrictions', e.target.value)}
                            className="border-wedding-primary/20 focus:border-wedding-primary"
                          />
                        </div>
                        
                        <div className="space-y-4">
                          <Label>Accommodations & Transportation (check all that apply)</Label>
                          <div className="space-y-3">
                            <div className="flex items-start space-x-2">
                              <Checkbox 
                                id="hotelBlock" 
                                checked={guestInfo.accommodations.includes('hotelBlock')}
                                onCheckedChange={() => handleCheckboxChange('hotelBlock')}
                              />
                              <div className="grid gap-1">
                                <Label 
                                  htmlFor="hotelBlock" 
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  I plan to stay at one of the recommended hotels
                                </Label>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <Checkbox 
                                id="shuttle" 
                                checked={guestInfo.accommodations.includes('shuttle')}
                                onCheckedChange={() => handleCheckboxChange('shuttle')}
                              />
                              <div className="grid gap-1">
                                <Label 
                                  htmlFor="shuttle" 
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  I will use the provided shuttle service
                                </Label>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <Checkbox 
                                id="selfDriving" 
                                checked={guestInfo.accommodations.includes('selfDriving')}
                                onCheckedChange={() => handleCheckboxChange('selfDriving')}
                              />
                              <div className="grid gap-1">
                                <Label 
                                  htmlFor="selfDriving" 
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  I will be driving myself to the venue
                                </Label>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="songRequests">Song Requests</Label>
                          <Textarea 
                            id="songRequests" 
                            placeholder="Is there a song that would get you on the dance floor?"
                            value={guestInfo.songRequests}
                            onChange={(e) => handleChange('songRequests', e.target.value)}
                            className="border-wedding-primary/20 focus:border-wedding-primary"
                          />
                        </div>
                      </>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-wedding-primary hover:bg-wedding-accent/90 text-white"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {hasExistingRsvp ? 'Update RSVP' : 'Submit RSVP'}
                    </Button>
                  </form>
                </div>
              </AnimatedSection>
            )}
          </div>
        </section>
        
        {/* Contact Info */}
        <section className="py-16 bg-wedding-secondary/20">
          <div className="container max-w-4xl mx-auto px-6">
            <AnimatedSection className="text-center" animation="fade-in">
              <h2 className="font-serif text-3xl text-wedding-dark mb-4">Questions?</h2>
              <div className="w-12 h-0.5 bg-wedding-primary mx-auto mb-6"></div>
              <p className="text-wedding-muted max-w-2xl mx-auto mb-4">
                If you have any questions or need assistance with your RSVP, please don't hesitate to contact us.
              </p>
              <p className="text-wedding-dark font-medium">
                <div>
                  Email: <a href="mailto:nihan.bir@gmail.com" className="text-wedding-primary hover:underline">nihan.bir@gmail.com</a>
                </div>
                <div>
                  Phone: <a className="text-wedding-primary hover:underline">+46707314374</a>
                </div>
                
              </p>
            </AnimatedSection>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Rsvp;
