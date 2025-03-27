import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/shared/AnimatedSection';

const RsvpPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'not-attending' | 'pending'>(
        user?.rsvpStatus || 'pending'
    );
    const [dietaryRequirements, setDietaryRequirements] = useState(user?.dietaryRequirements || '');
    const [plusOne, setPlusOne] = useState(user?.plusOne || false);

    useEffect(() => {
        if (user) {
            setRsvpStatus(user.rsvpStatus || 'pending');
            setDietaryRequirements(user.dietaryRequirements || '');
            setPlusOne(user.plusOne || false);
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) return;

        // Get users from local storage
        const usersJson = localStorage.getItem('users');
        if (!usersJson) return;

        const users = JSON.parse(usersJson);
        const userIndex = users.findIndex((u: any) => u.username === user.username);

        if (userIndex === -1) return;

        // Update user RSVP data
        const updatedUser = {
            ...users[userIndex],
            rsvpStatus,
            dietaryRequirements,
            plusOne
        };

        users[userIndex] = updatedUser;

        // Save to local storage
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        toast({
            title: "RSVP Submitted",
            description: "Thank you for your response!",
            variant: "default",
        });
    };

    if (!user) {
        return null; // Protected by PrivateRoute
    }

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
                                We're excited to celebrate with you! Please let us know if you can make it.
                            </p>
                        </AnimatedSection>
                    </div>
                </section>

                {/* RSVP Form */}
                <section className="py-16 bg-white">
                    <div className="container max-w-3xl mx-auto px-6">
                        <AnimatedSection animation="fade-in">
                            <div className="bg-white rounded-lg shadow-soft border border-wedding-accent/10 p-8">
                                <div className="text-center mb-8">
                                    <h2 className="font-serif text-2xl text-wedding-dark mb-2">
                                        Hello, {user.name}!
                                    </h2>
                                    <p className="text-wedding-muted">
                                        Please fill out your RSVP details below.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="font-serif text-xl text-wedding-dark">Will you be attending?</h3>
                                        <RadioGroup
                                            value={rsvpStatus}
                                            onValueChange={(value) => setRsvpStatus(value as any)}
                                            className="space-y-2"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="attending" id="attending" />
                                                <Label htmlFor="attending">Yes, I'll be there!</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="not-attending" id="not-attending" />
                                                <Label htmlFor="not-attending">Sorry, I can't make it</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    {rsvpStatus === 'attending' && (
                                        <>
                                            <div className="space-y-2">
                                                <Label htmlFor="dietary">Dietary Requirements</Label>
                                                <Textarea
                                                    id="dietary"
                                                    placeholder="Please let us know if you have any dietary requirements"
                                                    value={dietaryRequirements}
                                                    onChange={(e) => setDietaryRequirements(e.target.value)}
                                                    className="border-wedding-primary/20 focus:border-wedding-primary"
                                                />
                                            </div>

                                            <div className="flex items-start space-x-2">
                                                <Checkbox
                                                    id="plus-one"
                                                    checked={plusOne}
                                                    onCheckedChange={(checked) => setPlusOne(checked as boolean)}
                                                />
                                                <Label htmlFor="plus-one" className="leading-snug">
                                                    I would like to bring a plus one
                                                </Label>
                                            </div>
                                        </>
                                    )}

                                    <div className="flex justify-between pt-4">
                                        <Button
                                            variant="outline"
                                            onClick={() => navigate('/')}
                                            className="border-wedding-primary text-wedding-primary hover:bg-wedding-primary/10"
                                        >
                                            Back to Home
                                        </Button>
                                        <div className="space-x-4">
                                            <Button
                                                variant="outline"
                                                onClick={logout}
                                                className="border-wedding-primary text-wedding-primary hover:bg-wedding-primary/10"
                                            >
                                                Logout
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="bg-wedding-primary hover:bg-wedding-accent/90 text-white"
                                            >
                                                Submit RSVP
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* Contact Info */}
                <section className="py-16 bg-wedding-secondary/20">
                    <div className="container max-w-4xl mx-auto px-6">
                        <AnimatedSection className="text-center" animation="fade-in">
                            <h2 className="font-serif text-3xl text-wedding-dark mb-4">Questions?</h2>
                            <div className="w-12 h-0.5 bg-wedding-primary mx-auto mb-6"></div>
                            <p className="text-wedding-muted max-w-2xl mx-auto mb-4">
                                If you have any questions about your RSVP, please don't hesitate to contact us.
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
        </div>
    );
};

export default RsvpPage;