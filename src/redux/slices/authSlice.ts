import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { fetchCurrentUserAPI } from "../../api/services/userService"; // Import function
import { RootState } from "../../redux/store"; // Import RootState for selectors

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user_id: string | null;
  company_id: number | null;
  roletype: string | null; // Added role field
  // roletype: string | null; //Added role field
  user: {
    id: any;
    name: string;
    email: string;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user_id: null,
  company_id: null,
  roletype: 'null', //Initialize role
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
      state.token = action.payload.token; //Replace with actual token
      state.user_id = action.payload.user_id;
      state.company_id = action.payload.company_id;

      //Default to "pending" on signup
      // state.roletype = "null";

      localStorage.setItem(
        'authToken',
        JSON.stringify({ ...action.payload, roletype: 'pending' })
      );
    },

    //New action to update role after profile update
    updateRole: (state, action: PayloadAction<{ roletype: string }>) => {
      const normalizedRole = action.payload.roletype.trim().toLowerCase(); //Normalize
      // console.log('Updated Role in Redux:', normalizedRole);

      state.roletype = normalizedRole;
      localStorage.setItem(
        'authToken',
        JSON.stringify({
          ...JSON.parse(localStorage.getItem('authToken') || '{}'),
          roletype: normalizedRole, //Update role in localStorage
        })
      );
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.user_id = null;
      state.company_id = null;
      state.roletype = 'null'; //Clear role on logout
      localStorage.removeItem('persist:root');
    },
  },
});

export const { login, logout, updateRole } = authSlice.actions;
export default authSlice.reducer;
