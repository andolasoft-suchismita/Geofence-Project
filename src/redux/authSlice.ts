import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    user: {
        name: string;
        email: string;
    } | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ name: string; email: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem("authToken", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("authToken");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
