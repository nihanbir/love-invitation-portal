
// User models
export type PredefinedUser = {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  role: 'admin' | 'guest';
  rsvpStatus?: 'attending' | 'not-attending' | 'pending';
  dietaryRequirements?: string;
  plusOne?: boolean;
  isAuthenticated?: boolean;
  pin?: string;
};

export type User = Omit<PredefinedUser, 'password' | 'pin'>;

// Helper function to get users from localStorage or initialize with predefined users
const getUsers = (): PredefinedUser[] => {
  try {
    const usersJson = localStorage.getItem('users');
    let users = [];
    
    if (usersJson) {
      users = JSON.parse(usersJson);
    } else {
      // If no users in localStorage, initialize with predefined users
      const { predefinedUsers } = require('@/data/predefinedUsers');
      users = predefinedUsers;
      localStorage.setItem('users', JSON.stringify(predefinedUsers));
    }
    
    return users;
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

// Auth functions
export const authenticateUser = (
  username: string,
  password: string
): User | null => {
  try {
    const users = getUsers();
    
    // Find user
    const user = users.find(
      (user: PredefinedUser) => 
        user.username === username && user.password === password
    );
    
    if (!user) return null;
    
    // Create user without password and pin
    const { password: _password, pin: _pin, ...userWithoutSensitiveData } = user;
    
    return userWithoutSensitiveData;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

export const authenticateWithPin = (
  username: string,
  pin: string
): User | null => {
  try {
    const users = getUsers();
    
    // Find user
    const user = users.find(
      (user: PredefinedUser) => 
        user.username === username && user.pin === pin
    );
    
    if (!user) return null;
    
    // Create user without password and pin
    const { password: _password, pin: _pin, ...userWithoutSensitiveData } = user;
    
    return userWithoutSensitiveData;
  } catch (error) {
    console.error('PIN Authentication error:', error);
    return null;
  }
};

export const registerUser = async (
  username: string,
  password: string,
  name: string,
  email: string
): Promise<User | null> => {
  try {
    const users = getUsers();
    
    // Check if user already exists
    const userExists = users.some(
      (user: PredefinedUser) => user.username === username || user.email === email
    );
    
    if (userExists) {
      return null;
    }
    
    // Create new user
    const newUser: PredefinedUser = {
      id: crypto.randomUUID(),
      username,
      password,
      name,
      email,
      role: 'guest',
      rsvpStatus: 'pending',
    };
    
    // Add user to list
    users.push(newUser);
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Return user without password and pin
    const { password: _password, pin: _pin, ...userWithoutSensitiveData } = newUser;
    
    return userWithoutSensitiveData;
  } catch (error) {
    console.error('Registration error:', error);
    return null;
  }
};

// Check if a user exists
export const userExists = (username: string): boolean => {
  try {
    const users = getUsers();
    return users.some((user: PredefinedUser) => user.username === username);
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return false;
  }
};

// Check if a PIN is valid (exists for a user)
export const isValidPin = (username: string): boolean => {
  try {
    const users = getUsers();
    const user = users.find((user: PredefinedUser) => user.username === username);
    return user ? !!user.pin : false;
  } catch (error) {
    console.error('Error checking PIN validity:', error);
    return false;
  }
};

// Validate if a PIN meets the requirements (4 digits)
export const validatePinFormat = (pin: string): boolean => {
  return /^\d{4}$/.test(pin);
};

// Set initial PIN for a user
export const setInitialPin = (username: string, pin: string): boolean => {
  try {
    if (!validatePinFormat(pin)) {
      return false;
    }

    const users = getUsers();
    const userIndex = users.findIndex((user: PredefinedUser) => user.username === username);
    
    if (userIndex === -1) {
      return false;
    }
    
    // Update user's PIN
    users[userIndex].pin = pin;
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    return true;
  } catch (error) {
    console.error('Error setting initial PIN:', error);
    return false;
  }
};
