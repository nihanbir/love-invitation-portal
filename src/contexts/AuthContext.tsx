import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  authenticateUser,
  setInitialPin as setUserInitialPin,
  initializeUsers,
  isFirstLogin as checkIsFirstLogin,
  AuthContextType,
  PredefinedUser
} from '@/lib/auth';

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<PredefinedUser | null>(null);
  
  useEffect(() => {
    // Initialize users in local storage
    initializeUsers();

    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, pin: string): Promise<boolean> => {
    const authenticatedUser = await authenticateUser(username, pin);

    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const setInitialPin = async (username: string, pin: string): Promise<boolean> => {
    const success = await setUserInitialPin(username, pin);
    return success;
  };

  const isFirstLogin = (username: string): boolean => {
    return checkIsFirstLogin(username);
  };
  const isAuthenticated = () => !!user;
  const value = {
    user,
    login,
    logout,
    setInitialPin,
    isFirstLogin,
    isAuthenticated: isAuthenticated()
  };

  return (
      <AuthContext.Provider value={value}>
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
