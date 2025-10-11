import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  role?: string | null;
  user: any;
  username?: string | null;
}

const storeuser= localStorage.getItem('user');
const initialState: AuthState = {
  isAuthenticated: false,
  role: null,
  user: storeuser?JSON.parse(storeuser):null,
  username: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ role: string; user: any; username: string }>
    ) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.user = action.payload.user;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.user = null;
      state.username = null;
    },
    
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
