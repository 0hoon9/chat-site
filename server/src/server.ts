import express, { Express, Request, Response } from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';
import cors from 'cors';

import { Message, Session, User } from './types';
import { getUniqueUsersOnlineByUsername } from './utilities';
import { PORT, CLIENT_HOST } from './config';

const app: Express = express();

// Setup Server
const server: http.Server = http.createServer(app);
const io: socketio.Server = new socketio.Server(server, {
  cors: {
    origin: CLIENT_HOST,
    credentials: true,
  },
});

app.use(cors());

// DB대신 임시로 data 저장할 변수
let users: User[] = [];
let messages: Message[] = [];
let activeUserSessions: Session[] = [];

// routes
app.get('/api/messages', (request: Request, response: Response) => {
  console.log('api messages....');
  response.send({ messages });
});

app.get('/api/users', (request: Request, response: Response) => {
  console.log('api users....');
  response.send({ users });
});

// Socket server-side
io.on('connection', (socket) => {
  const { id } = socket.client;
  console.log(`new client session: ${id}`);

  // New login
  socket.on('new login', (user: User) => {
    console.log(`user connected: ${user.username}`);

    // 유저목록에 추가
    if (!users.some((existingUser) => existingUser.username === user.username)) {
      users = [...users, user];
      io.emit('new user added', user);
    }

    // 유저이름 저장
    socket.sessionUsername = user.username;
    activeUserSessions.push({
      session: id,
      username: user.username,
    });

    io.emit('users online', getUniqueUsersOnlineByUsername(activeUserSessions));
  });

  // 메세지 보낼때
  socket.on('send message', (message: Message) => {
    console.log(`message: ${message.author}: ${message.content}`);
    messages.push(message);

    io.emit('receive message', message);
  });

  // 타이핑 중 일때
  socket.on('typing...', (username: string) => {
    console.log(`User Typing...: ${username}`);

    io.emit('user starts typing...', username);
  });

  // 타이핑 멈췄을때
  socket.on('stopped typing...', (username: string) => {
    console.log(`User Stopped Typing...: ${username}`);
    io.emit('user stopped typing...', username);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`user disconnected: ${socket.sessionUsername}`);
    // 최근 세션을 지운다
    activeUserSessions = activeUserSessions.filter((user) => !(user.username === socket.sessionUsername && user.session === id));

    io.emit('users online', getUniqueUsersOnlineByUsername(activeUserSessions));
  });
});

app.set('port', PORT);

// Start server
server.listen(PORT, () => console.log(`서버 ${PORT}포트에서 구동중...`));
