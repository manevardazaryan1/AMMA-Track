import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authenticationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})