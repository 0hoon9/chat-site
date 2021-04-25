import { Dispatch } from 'redux';

import { addMessage } from '../store/messages.slice';
import { addUser, removeTypingUser, setOnlineUsers, setTypingUser } from '../store/users.slice';
import { Message, User, RootState } from '../utilities/types';

interface SocketMiddlewareParams {
  dispatch: Dispatch;
  getState: () => RootState;
}

// 서버에서 emit된
export default function socketMiddleware(socket: any) {
  return (params: SocketMiddlewareParams) => (next: any) => (action: any) => {
    const { dispatch } = params;
    const { type, payload } = action;

    switch (type) {
      // Connect to the socket when a user logs in
      case 'users/login': {
        socket.connect();
        console.log('커넥트');
        // Set up all the socket event handlers
        // When these events are received from the socket, they'll dispatch the proper Redux action

        // Update the online users list every time a user logs in or out
        socket.on('users online', (onlineUsers: string[]) => {
          console.log('유저 온라인');
          dispatch(setOnlineUsers(onlineUsers));
        });

        // Append a message every time a new one comes in
        socket.on('receive message', (message: Message) => {
          console.log('리시브 메세지');
          dispatch(addMessage(message));
        });

        // Remove if some user stops typing
        socket.on('user stopped typing...', (username: string) => {
          console.log('타이핑 중단');
          dispatch(removeTypingUser(username));
        });

        // Add if some user starts typing
        socket.on('user starts typing...', (username: string) => {
          console.log('타이핑 시작');
          console.log('type: ', type);
          dispatch(setTypingUser(username));
        });

        // Append a user every time a new one is registered
        socket.on('new user added', (user: User) => {
          dispatch(addUser(user));
        });

        // Add the current user to the online users list
        // 가장 처음에 발생되는 emit
        socket.emit('new login', payload);

        break;
      }

      // Telling the sever that this user is typing...
      case 'users/sendThisUserIsTyping': {
        socket.emit('typing...', payload);

        break;
      }

      // Telling the server that this user stopped typing..
      case 'users/sendThisUserStoppedTyping': {
        socket.emit('stopped typing...', payload);

        return;
      }

      // Disconnect from the socket when a user logs out
      case 'users/logout': {
        socket.disconnect();

        break;
      }
      // Let the server be the source of truth for all messages; don't dispatch anything
      case 'messages/sendMessage': {
        socket.emit('send message', payload);

        return;
      }
    }

    return next(action);
  };
}
