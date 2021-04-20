import { User } from './utilities/types';

export const users: User[] = [
  {
    email: 'user1@ex.com',
    username: 'user1',
    online: true,
  },
  {
    email: 'user2@ex.com',
    username: 'user2',
    online: true,
  },
  {
    email: 'user3@ex.com',
    username: 'user3',
    online: false,
  },
  {
    email: 'user4@ex.com',
    username: 'user4',
    online: false,
  },
  {
    email: 'user5@ex.com',
    username: 'user5',
    online: true,
  },
];

export const myUser: User = {
  email: 'user2@ex.com',
  username: 'user2',
  online: true,
};

export const typingUsers: string[] = ['user2', 'user5'];
