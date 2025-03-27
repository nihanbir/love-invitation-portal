
export type PredefinedUser = {
    id: string; // Add ID field for user identification
    username: string;
    name: string;
    pin?: string;
    hasSetPin: boolean;
    rsvpStatus?: 'attending' | 'not-attending' | 'pending';
    dietaryRequirements?: string;
    plusOne?: boolean;
};

export const predefinedUsers: PredefinedUser[] = [
    { 
        id: 'user1',
        username: 'john.smith', 
        name: 'John Smith', 
        hasSetPin: false 
    },
    // Add more predefined users as needed
];
