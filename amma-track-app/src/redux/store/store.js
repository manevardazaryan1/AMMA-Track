import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authenticationSlice'
import workspacesReducer from '../slices/workspacesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workspaces:workspacesReducer,
  },
})