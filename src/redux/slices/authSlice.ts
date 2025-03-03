import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 
interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: {
        name: string;
        email: string;
    } | null;
}
 
const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    user: null,
};
 
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{token: string}>) =>
             {
            state.isAuthenticated = true;
            state.token = action.payload.token; // Replace with actual token
            localStorage.setItem("authToken", JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null
            localStorage.removeItem("authToken");
        },
    },
});
 
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
 