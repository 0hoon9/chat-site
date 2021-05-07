import React from 'react';
import { User } from '../utilities/types';

export interface Props {
  users: User[];
  myUser: User | null;
  typingUsers: string[];
}

export const Sidebar: React.FC<Props> = ({ users, myUser, typingUsers }) => {
  return (
    <div className='flex-none min-w-300 bg-blue-dark overflow-y-auto'>
      <div>
        <h2 className='m-6 text-white font-bold text-lg'>
          <i className='fas fa-user'> Users</i>
        </h2>
        {users.map((user, i: number) => (
          <div key={`${user.username}-${i}`} className='p-3 mx-5 my-2 text-white text-opacity-70 bg-dark rounded-md'>
            <div className='flex items-center'>
              <div className={`h-2 w-2 mr-2 rounded-full inline-block ${user.online ? 'bg-green-400' : 'bg-gray-300'}`}></div>
              <span>{user.username}</span>
              {user.username === myUser!.username && <span className='ml-1 text-white text-opacity-30'>(나)</span>}
              {typingUsers.find((username) => user.username === username) && (
                <span className='ml-1 text-white text-opacity-50 italic'> 입력중...</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
