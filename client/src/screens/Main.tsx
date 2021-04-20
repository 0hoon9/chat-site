import React from 'react';
import ChatArea from '../components/ChatArea';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { messageInput, messages } from '../Messages';
import { users, myUser, typingUsers } from '../Users';

export const Main: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className='flex m-0 content'>
        <Sidebar users={users} myUser={myUser} typingUsers={typingUsers} />
        <ChatArea messages={messages} messageInput={messageInput} />
      </div>
    </>
  );
};

export default Main;
