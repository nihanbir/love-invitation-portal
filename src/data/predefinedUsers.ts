
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
  { username: 'john_smith', name: 'John Smith', hasSetPin: false },
  { username: 'jane_doe', name: 'Jane Doe', hasSetPin: false },
  { username: 'michael_johnson', name: 'Michael Johnson', hasSetPin: false },
  { username: 'emily_williams', name: 'Emily Williams', hasSetPin: false },
  { username: 'david_brown', name: 'David Brown', hasSetPin: false },
  { username: 'sarah_davis', name: 'Sarah Davis', hasSetPin: false },
  { username: 'james_miller', name: 'James Miller', hasSetPin: false },
  { username: 'jessica_wilson', name: 'Jessica Wilson', hasSetPin: false },
  { username: 'robert_moore', name: 'Robert Moore', hasSetPin: false },
  { username: 'lisa_taylor', name: 'Lisa Taylor', hasSetPin: false },
];
