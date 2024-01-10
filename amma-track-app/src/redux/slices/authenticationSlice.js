import { createSlice } from '@reduxjs/toolkit'
import CryptoJS from 'crypto-js';

const initialState = {
    loggedIn: false,
    users: [{id: 1, userName: 'admin', email: 'admin@gmail.com', password: CryptoJS.SHA256("admin").toString(CryptoJS.enc.Hex) }],
    loggedUser: {},
}

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
      signUp: (state, user) => {
        state.users = [...state.users, user.payload];
        window.localStorage.setItem('users', JSON.stringify(state.users));
      },

      login: (state, user) => {
        state.loggedIn = true;
        state.loggedUser = user;
        window.localStorage.setItem('isLoggedIn', 'ON');
      },

      logOut: (state) => {
        state.loggedIn = false;
        state.loggedUser = {};
        window.localStorage.setItem('isLoggedIn', 'OFF');
        window.localStorage.removeItem('loggedUser');
      },

      setUsers: (state) => {
        const signUpUsers = JSON.parse(window.localStorage.getItem("users"));

        if (signUpUsers && signUpUsers.length) {
          state.users = signUpUsers;
        }
      }
    },
  })
  

  export const { signUp, login, logOut, setUsers } = authSlice.actions
  
  export default authSlice.reducer