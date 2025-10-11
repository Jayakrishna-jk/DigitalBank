import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Store/Slices/authSlice';
import accountReducer from './Slices/accountSlice'
export const store = configureStore({
  reducer: {
    // Add your reducers here
     auth: authReducer,
     accounts: accountReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;