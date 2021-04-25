import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../utilities/types';

const initialState: AuthState = {
  myUser: null,
  isAuth: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<any>) => {
      state.myUser = payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.myUser = null;
      state.isAuth = false;
    },
  },
});

export const { login, logout } = usersSlice.actions;
export default usersSlice.reducer;
