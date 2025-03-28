
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, authenticateUser, registerUser, userExists, isValidPin, setInitialPin, authenticateWithPin } from '@/lib/auth';

export type AuthContextType = {
  user: User | null;
  login: (username: string, pin: string) => Promise<boolean>;
  register: (username: string, password: string, name: string, email: string) => Promise<User | null>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  isFirstLogin: (username: string) => boolean;
  setInitialPin: (username: string, pin: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try to get the user from localStorage on component mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, pin: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call the authentication service with PIN
      const authenticatedUser = authenticateWithPin(username, pin);
      
      if (authenticatedUser) {
        // Store the user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
        setUser(authenticatedUser);
        return true;
      } else {
        setError('Invalid username or PIN');
        return false;
      }
    } catch (err) {
      setError('An error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    username: string, 
    password: string, 
    name: string,
    email: string
  ): Promise<User | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call the registration service
      const registeredUser = await registerUser(username, password, name, email);
      
      if (registeredUser) {
        // Store the user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(registeredUser));
        setUser(registeredUser);
        return registeredUser;
      } else {
        setError('Username or email already exists');
        return null;
      }
    } catch (err) {
      setError('An error occurred during registration');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Remove the user from localStorage
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const isFirstLogin = (username: string): boolean => {
    return userExists(username) && !isValidPin(username);
  };

  const handleSetInitialPin = async (username: string, pin: string): Promise<boolean> => {
    try {
      const success = setInitialPin(username, pin);
      return success;
    } catch (error) {
      console.error("Error setting initial PIN:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        register, 
        logout, 
        isLoading, 
        error, 
        isFirstLogin, 
        setInitialPin: handleSetInitialPin 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
