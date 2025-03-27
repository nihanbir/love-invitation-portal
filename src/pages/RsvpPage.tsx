import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

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
        <div className="container mx-auto py-10 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-primary mb-4 text-center">RSVP</h1>
                <p className="text-lg text-center mb-8">
                    We're excited to celebrate with you! Please let us know if you can make it.
                </p>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Hello, {user.name}!</CardTitle>
                        <CardDescription>
                            Please fill out your RSVP details below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Will you be attending?</h3>
                                <RadioGroup value={rsvpStatus} onValueChange={(value) => setRsvpStatus(value as any)}>
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
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="plus-one"
                                            checked={plusOne}
                                            onCheckedChange={(checked) => setPlusOne(checked as boolean)}
                                        />
                                        <Label htmlFor="plus-one">I would like to bring a plus one</Label>
                                    </div>
                                </>
                            )}

                            <Button type="submit" className="w-full">
                                Submit RSVP
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={() => navigate('/')}>
                            Back to Home
                        </Button>
                        <Button variant="outline" onClick={logout}>
                            Logout
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default RsvpPage;
