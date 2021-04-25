import express, { Express, Request, Response } from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';
import cors from 'cors';

import { Message, Session, User } from './types';
import { getUniqueUsersOnlineByUsername } from './utilities';

const app: Express = express();

// Setup Server
const server: http.Server = http.createServer(app);
const io: socketio.Server = new socketio.Server(server, {
  cors: {
    origin: process.env.CLIENT,
    credentials: true,
  },
});

app.use(cors());

// DB대신 임시로 data 저장할 변수
let users: User[] = [];
let messages: Message[] = [];
let activeUserSessions: Session[] = [];

// routes
app.get('/api/users', (request: Request, response: Response) => {
  response.send({ users });
});

app.get('/api/messages', (request: Request, response: Response) => {
  response.send({ messages });
});

// Socket server-side
io.on('connection', (socket) => {
  const { id } = socket.client;
  console.log(`new client session: ${id}`);

  // New login
  socket.on('new login', (user: User) => {
    console.log(`user connected: ${user.username}`);

    // Add the new login to the list of all users
    if (!users.some((existingUser) => existingUser.username === user.username)) {
      users = [...users, user];
      io.emit('new user added', user);
    }

    // Save the current username
    socket.sessionUsername = user.username;
    activeUserSessions.push({
      session: id,
      username: user.username,
    });

    io.emit('users online', getUniqueUsersOnlineByUsername(activeUserSessions));
  });

  // Send Message
  socket.on('send message', (message: Message) => {
    console.log(`message: ${message.author}: ${message.content}`);
    messages.push(message);

    io.emit('receive message', message);
  });

  // User Typing
  socket.on('typing...', (username: string) => {
    console.log(`User Typing...: ${username}`);

    io.emit('user starts typing...', username);
  });

  // User Stopped Typing
  socket.on('stopped typing...', (username: string) => {
    console.log(`User Stopped Typing...: ${username}`);

    io.emit('user stopped typing...', username);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`user disconnected: ${socket.sessionUsername}`);
    // Remove the current session
    activeUserSessions = activeUserSessions.filter((user) => !(user.username === socket.sessionUsername && user.session === id));

    io.emit('users online', getUniqueUsersOnlineByUsername(activeUserSessions));
  });
});

app.set('port', process.env.PORT);

// Start server
server.listen(process.env.PORT, () => console.log('서버 5000포트에서 구동중...'));
