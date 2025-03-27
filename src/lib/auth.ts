
import { predefinedUsers, PredefinedUser } from '@/data/predefinedUsers';

// Auth context type
export type AuthContextType = {
    user: PredefinedUser | null;
    login: (username: string, pin: string) => Promise<boolean>;
    logout: () => void;
    setInitialPin: (username: string, pin: string) => Promise<boolean>;
    isFirstLogin: (username: string) => boolean;
    register?: (username: string, email: string, password: string) => Promise<boolean>;
    isAuthenticated?: boolean;
};

// Re-export the PredefinedUser type
export type { PredefinedUser };

// Function to check if a username exists in our predefined list
export function userExists(username: string): boolean {
    return predefinedUsers.some(user => user.username === username);
}

// Function to check if a user needs to set a PIN
export function isFirstLogin(username: string): boolean {
    const user = predefinedUsers.find(user => user.username === username);
    return user ? !user.hasSetPin : false;
}

// Function to validate a 4-digit PIN
export function isValidPin(pin: string): boolean {
    return /^\d{4}$/.test(pin);
}

// Function to set the initial PIN for a user
export function setInitialPin(username: string, pin: string): Promise<boolean> {
    return new Promise((resolve) => {
        // Find the user in local storage or initial array
        let users = JSON.parse(localStorage.getItem('users') || JSON.stringify(predefinedUsers));
        const userIndex = users.findIndex((user: PredefinedUser) => user.username === username);

        if (userIndex === -1 || !isValidPin(pin)) {
            resolve(false);
            return;
        }

        // Update the user's PIN and hasSetPin status
        users[userIndex] = {
            ...users[userIndex],
            pin,
            hasSetPin: true
        };

        // Save to local storage
        localStorage.setItem('users', JSON.stringify(users));
        resolve(true);
    });
}

// Function to authenticate a user
export function authenticateUser(username: string, pin: string): Promise<PredefinedUser | null> {
    return new Promise((resolve) => {
        // Get users from local storage or use predefined list
        const users = JSON.parse(localStorage.getItem('users') || JSON.stringify(predefinedUsers));
        const user = users.find((u: PredefinedUser) => u.username === username && u.pin === pin);

        resolve(user || null);
    });
}

// Initialize local storage with predefined users if it doesn't exist
export function initializeUsers(): void {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(predefinedUsers));
    }
}
