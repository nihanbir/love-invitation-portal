
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { userExists, isValidPin } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { User, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [step, setStep] = useState<'username' | 'pin' | 'createPin'>('username');
  const [error, setError] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  
  const { login, isFirstLogin, setInitialPin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }
    
    if (!userExists(username)) {
      setError('This username is not recognized');
      return;
    }
    
    if (isFirstLogin(username)) {
      setStep('createPin');
    } else {
      setStep('pin');
    }
  };
  
  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!pin.trim()) {
      setError('Please enter your 4-digit PIN');
      return;
    }
    
    const success = await login(username, pin);
    
    if (success) {
      toast({
        title: "Login successful",
        description: "Welcome to our wedding website!",
        variant: "default",
      });
      navigate('/dashboard');
    } else {
      setError('Invalid PIN');
    }
  };
  
  const handleCreatePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isValidPin(pin)) {
      setError('PIN must be exactly 4 digits');
      return;
    }
    
    if (pin !== confirmPin) {
      setError('PINs do not match');
      return;
    }
    
    const success = await setInitialPin(username, pin);
    
    if (success) {
      toast({
        title: "PIN created successfully",
        description: "Your 4-digit PIN has been set. Please use it to log in.",
        variant: "default",
      });
      setStep('pin');
    } else {
      setError('Failed to set PIN. Please try again.');
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-primary text-2xl text-center">
          {step === 'username' && 'Login to Our Wedding'}
          {step === 'pin' && 'Enter Your PIN'}
          {step === 'createPin' && 'Create Your PIN'}
        </CardTitle>
        <CardDescription className="text-center">
          {step === 'username' && 'Please enter your username to begin'}
          {step === 'pin' && 'Please enter your 4-digit PIN'}
          {step === 'createPin' && 'Create a 4-digit PIN for future logins'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 'username' && (
          <form onSubmit={handleUsernameSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="your_username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </div>
          </form>
        )}
        
        {step === 'pin' && (
          <form onSubmit={handlePinSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pin">PIN</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="pin"
                    type="password"
                    maxLength={4}
                    placeholder="••••"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                    className="pl-10"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => setStep('username')}
              >
                Back
              </Button>
            </div>
          </form>
        )}
        
        {step === 'createPin' && (
          <form onSubmit={handleCreatePinSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPin">New 4-digit PIN</Label>
                <Input
                  id="newPin"
                  type="password"
                  maxLength={4}
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPin">Confirm PIN</Label>
                <Input
                  id="confirmPin"
                  type="password"
                  maxLength={4}
                  placeholder="••••"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                Create PIN
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => setStep('username')}
              >
                Back
              </Button>
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <p className="text-sm text-center text-muted-foreground">
          This login system uses predefined accounts. If you don't have a username, please contact the couple.
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
