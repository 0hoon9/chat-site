// User

export interface User {
  email: string;
  username: string;
  online?: boolean;
}

//Message

export interface Message {
  content: string;
  date: string;
  author: string;
}
