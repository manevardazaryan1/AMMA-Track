import { createSlice } from '@reduxjs/toolkit'
import CryptoJS from 'crypto-js';

const initialState = {
  loggedIn: false,
  users: [{ id: 1, userName: 'admin', email: 'admin@gmail.com', password: CryptoJS.SHA256("admin").toString(CryptoJS.enc.Hex) }],
  loggedUser: {},
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    signUp: (state, user) => {
      state.users = [...state.users, user.payload];
    },

    login: (state, user) => {
      state.loggedIn = true;
      state.loggedUser = user.payload;
    },

    logOut: (state) => {
      state.loggedIn = false;
      state.loggedUser = {};
    },

    setUsers: (state) => {
      const signUpUsers = JSON.parse(window.localStorage.getItem("users"));
      if (signUpUsers && signUpUsers.length) {
        state.users = signUpUsers;
      }
    }
  },
})


export const { signUp, login, logOut } = authSlice.actions

export default authSlice.reducer