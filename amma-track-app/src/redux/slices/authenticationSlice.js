import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn: false,
    users: [],
    loggedUser: {},
}

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
      signUp: (state, user) => {
        state.users = [user, ...state.users];
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
    },
  })
  

  export const { signUp, login, logOut } = authSlice.actions
  
  export default authSlice.reducer