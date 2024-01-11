import { configureStore, combineReducers } from '@reduxjs/toolkit'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from '../slices/authenticationSlice'
import workspacesReducer from '../slices/workspacesSlice'
import boardsReducer from '../slices/boardsSlice'
import creationReducer from '../slices/creationBoxSlice'
const rootReducer = combineReducers({
  auth: authReducer,
  workspaces: workspacesReducer,
  boards: boardsReducer,
  creation: creationReducer,
})
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['creation']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export default store;