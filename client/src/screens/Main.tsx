import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { users, currentUser, typingUsers } from '../Users';

export const Main: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className='flex m-0 content'>
        <Sidebar users={users} currentUser={currentUser} typingUsers={typingUsers} />
      </div>
    </>
  );
};

export default Main;
