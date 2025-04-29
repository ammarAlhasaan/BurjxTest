import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../store';


interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthenticated, logout } = authSlice.actions;

export default authSlice.reducer;

// Simple base selector to get the whole auth state
const selectAuthState = (state: RootState) => state.auth;

// Now the proper memoized selector
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (auth) => auth.isAuthenticated
);
