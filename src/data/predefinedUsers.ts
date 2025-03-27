export type PredefinedUser = {
    username: string;
    name: string;
    pin?: string;
    hasSetPin: boolean;
    rsvpStatus?: 'attending' | 'not-attending' | 'pending';
    dietaryRequirements?: string;
    plusOne?: boolean;
};

export const predefinedUsers: PredefinedUser[] = [
    { username: 'john.smith', name: 'John Smith', hasSetPin: false },
];
