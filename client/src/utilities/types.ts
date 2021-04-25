// User
export interface User {
  email: string;
  username: string;
  online?: boolean;
}

export interface UsersState {
  users: User[];
  onlineUsers: string[];
  loading: boolean;
  error: string | null;
  typingUsers: string[];
}

// Message
export interface Message {
  content: string;
  date: string;
  author: string;
}

export interface MessagesState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

// Store
export interface AuthState {
  myUser: User | null;
  isAuth: boolean;
  error: string | null;
}

export interface RootState {
  authState: AuthState;
  usersState: UsersState;
  messagesState: MessagesState;
}
