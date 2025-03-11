import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user_id: string | null;
  company_id: number | null;
  user: {
    name: string;
    email: string;
  } | null;
}
 
const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user_id: null,
  company_id: null,
  user: null,
};
 
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        token: string;
        user_id: string;
        company_id: number | null;
      }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token; // Replace with actual token
      state.user_id = action.payload.user_id;
      state.company_id = action.payload.company_id;
      localStorage.setItem('authToken', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.user_id = null;
      state.company_id = null;
      localStorage.removeItem('authToken');
    },
  },
});
 
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
 