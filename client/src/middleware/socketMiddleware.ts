import { Dispatch } from 'redux';

import { addMessage } from '../store/messages.slice';
import { addUser, removeTypingUser, setOnlineUsers, setTypingUser } from '../store/users.slice';
import { Message, User, RootState } from '../utilities/types';

interface SocketMiddlewareParams {
  dispatch: Dispatch;
  getState: () => RootState;
}

export default function socketMiddleware(socket: any) {
  return (params: SocketMiddlewareParams) => (next: any) => (action: any) => {
    const { dispatch } = params;
    const { type, payload } = action;

    switch (type) {
      // 로그인시 Connect
      case 'users/login': {
        socket.connect();
        console.log('커넥트');
        // Socket event handlers 등록
        // 소켓에서 이벤트 발생되면 수신받아 리덕스 액션을 dispatch

        // 로그인/아웃시 유저 리스트 업데이트
        socket.on('users online', (onlineUsers: string[]) => {
          console.log('유저 온라인');
          dispatch(setOnlineUsers(onlineUsers));
        });

        // 새 메세지가 올 때마다 메시지 추가
        socket.on('receive message', (message: Message) => {
          console.log('메세지 수신');
          dispatch(addMessage(message));
        });

        // 유저가 입력을 중지하면 TypingUser 제거
        socket.on('user stopped typing...', (username: string) => {
          console.log('타이핑 중단');
          dispatch(removeTypingUser(username));
        });

        // 유저 입력시 TypingUser 추가
        socket.on('user starts typing...', (username: string) => {
          console.log('타이핑 시작');
          console.log('type: ', type);
          dispatch(setTypingUser(username));
        });

        // 새 유저가 등록될 때 마다 User추가
        socket.on('new user added', (user: User) => {
          dispatch(addUser(user));
        });

        // 온라인 유저 목록에 현재 유저 추가
        socket.emit('new login', payload);
        break;
      }

      // 유저가 입력 중임을 서버에 알림
      case 'users/sendThisUserIsTyping': {
        socket.emit('typing...', payload);
        break;
      }

      // 유저가 입력을 중지했음을 서버에 알림
      case 'users/sendThisUserStoppedTyping': {
        socket.emit('stopped typing...', payload);
        return;
      }

      // 유저가 로그 아웃 할 때 소켓에서 연결 해제
      case 'users/logout': {
        socket.disconnect();
        break;
      }
      // 메세지 전송시 서버에 알림
      case 'messages/sendMessage': {
        socket.emit('send message', payload);
        return;
      }
    }

    return next(action);
  };
}
