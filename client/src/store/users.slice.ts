import axios from 'axios';
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { User, UsersState } from '../utilities/types';

const initialState: UsersState = {
  users: [],
  onlineUsers: [],
  loading: false,
  error: null,
  typingUsers: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setOnlineUsers: (state, { payload }: PayloadAction<string[]>) => {
      state.onlineUsers = payload;
    },
    setUsers: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload;
    },
    addUser: (state, { payload }: PayloadAction<User>) => {
      state.users.push(payload);
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setLoadingComplete: (state) => {
      state.loading = false;
    },
    setTypingUser: (state, { payload }) => {
      state.typingUsers = [payload, ...[...state.typingUsers].filter((username) => username !== payload)];
    },
    removeTypingUser: (state, { payload }) => {
      state.typingUsers = state.typingUsers.filter((username) => username !== payload);
    },
    sendThisUserIsTyping: (state, { payload }: PayloadAction<any>) => {},
    sendThisUserStoppedTyping: (state, { payload }: PayloadAction<any>) => {},
  },
});

export const {
  setUsers,
  addUser,
  setOnlineUsers,
  setLoading,
  setLoadingComplete,
  setTypingUser,
  removeTypingUser,
  sendThisUserIsTyping,
  sendThisUserStoppedTyping,
} = usersSlice.actions;
export default usersSlice.reducer;

//Action
export function getUsers() {
  return async (dispatch: Dispatch, getState: () => {}) => {
    dispatch(setLoading());

    try {
      const { data } = await axios('/api/users');

      dispatch(setUsers(data.users));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoadingComplete());
    }
  };
}
