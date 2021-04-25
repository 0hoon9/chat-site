import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ChatArea } from '../components/ChatArea';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { messageInput, messages } from '../Messages';
import { users, myUser, typingUsers } from '../data/Users';
import { logout } from '../store/auth.slice';

export const Main: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogoutClick = (event: any) => {
    // 로그아웃시 localStorage 유저 정보 삭제
    localStorage.removeItem('user');

    dispatch(logout());
  };

  useEffect(() => {}, [dispatch]);

  return (
    <>
      <Navbar onClick={handleLogoutClick} />
      <div className='flex m-0 content'>
        <Sidebar users={users} myUser={myUser} typingUsers={typingUsers} />
        <ChatArea messages={messages} messageInput={messageInput} />
      </div>
    </>
  );
};

export default Main;
