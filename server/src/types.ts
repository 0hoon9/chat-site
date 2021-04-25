export interface User {
  username: string;
  email: string;
}

export interface Message {
  content: string;
  date: string;
  author: string;
}

export interface Session {
  username: string;
  session: string;
}
