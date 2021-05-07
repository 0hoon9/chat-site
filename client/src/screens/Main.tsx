import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import _ from 'lodash';

import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { ChatArea } from '../components/ChatArea';
import { sendMessage, getMessages } from '../store/messages.slice';
import { sendThisUserIsTyping, sendThisUserStoppedTyping } from '../store/users.slice';
import { logout } from '../store/auth.slice';
import { getUsers } from '../store/users.slice';
import { RootState, Message } from '../utilities/types';
import { Loader } from '../components/Loader';

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const [messageInput, setMessageInput] = useState('');

  const { myUser } = useSelector((state: RootState) => state.authState);
  const { users, loading: usersLoading, onlineUsers, typingUsers } = useSelector((state: RootState) => state.usersState);
  const { messages, loading: messagesLoading } = useSelector((state: RootState) => state.messagesState);

  const handleLogoutClick = (event: any) => {
    // 로그아웃시 세션삭제
    localStorage.removeItem('user');

    dispatch(logout());
  };

  // 타이핑 표시 디바운스 적용
  const debouncedTypingIndication = useCallback(
    _.debounce(() => dispatch(sendThisUserIsTyping(myUser!.username)), 200),
    [] // 처음에 한 번만 생성
  );

  const handleSubmitForm = (event: any) => {
    event.preventDefault();

    if (messageInput && messageInput.trim() !== '') {
      const message: Message = {
        content: messageInput.trim(),
        date: dayjs().format(),
        author: myUser!.username,
      };

      dispatch(sendThisUserStoppedTyping(myUser!.username));
      dispatch(sendMessage(message));
    }

    setMessageInput('');
  };
  // 메세지 인풋 값이 비었을때 타이핑표시 제거
  useEffect(() => {
    if (messageInput === '') {
      dispatch(sendThisUserStoppedTyping(myUser!.username));

      // 마지막 디바운스 처리
      setTimeout(() => {
        dispatch(sendThisUserStoppedTyping(myUser!.username));
      }, 200);
    }
  }, [messageInput, myUser, dispatch]);

  const handleChangeInput = (event: any) => {
    if (event.target.value !== '') debouncedTypingIndication();

    setMessageInput(event.target.value);
  };

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getMessages());
  }, [dispatch]);

  // 온라인유저 적용
  const usersWithOnlineData = useMemo(() => {
    if (users.length < 1) {
      return [];
    }

    return users
      .map((user) => ({
        ...user,
        online: onlineUsers.some((onlineUsers) => onlineUsers === user.username),
      }))
      .sort((a, b) => a.username.localeCompare(b.username));
  }, [users, onlineUsers]);

  // 가장 최근 순으로 메세지 출력
  const reversedMessages = useMemo(() => {
    if (messages.length < 1) {
      return [];
    }

    return [...messages].reverse();
  }, [messages]);

  if (messagesLoading || usersLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar onClick={handleLogoutClick} />
      <div className='flex m-0 content'>
        <Sidebar users={usersWithOnlineData} myUser={myUser} typingUsers={typingUsers} />
        <ChatArea
          messages={reversedMessages}
          messageInput={messageInput}
          handleSubmitForm={handleSubmitForm}
          handleChangeInput={handleChangeInput}
        />
      </div>
    </>
  );
};
