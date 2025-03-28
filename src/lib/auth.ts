
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
};

export type User = Omit<PredefinedUser, 'password'>;

// Auth functions
export const authenticateUser = (
  username: string,
  password: string
): User | null => {
  try {
    // Get users from localStorage if they exist
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
    
    // Find user
    const user = users.find(
      (user: PredefinedUser) => 
        user.username === username && user.password === password
    );
    
    if (!user) return null;
    
    // Create user without password
    const { password: _password, ...userWithoutPassword } = user;
    
    return userWithoutPassword;
  } catch (error) {
    console.error('Authentication error:', error);
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
    // Get users from localStorage if they exist
    const usersJson = localStorage.getItem('users');
    let users = [];
    
    if (usersJson) {
      users = JSON.parse(usersJson);
    } else {
      // If no users in localStorage, initialize with predefined users
      const { predefinedUsers } = require('@/data/predefinedUsers');
      users = predefinedUsers;
    }
    
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
    
    // Return user without password
    const { password: _password, ...userWithoutPassword } = newUser;
    
    return userWithoutPassword;
  } catch (error) {
    console.error('Registration error:', error);
    return null;
  }
};
