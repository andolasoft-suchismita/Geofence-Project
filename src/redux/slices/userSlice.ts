import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createUserAPI, fetchUsersAPI, updateUser, deleteUser } from "../../api/services/userService"; 

// Define User Interface
export interface User {
  
  first_name: string;
  last_name: string;
  employee_id: string;
  email: string;
  roletype: string;
  doj: string;
  dob: string;
  designation: string;
  password: string;
}

// Define Initial State
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Fetch Users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await fetchUsersAPI();
        return response;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
});

// Create User
export const createUser = createAsyncThunk("users/createUser", async (userData: User, { rejectWithValue }) => {
    try {
        const response = await createUserAPI(userData);
        return response;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to create user");
    }
});

// Update User
export const updateUserThunk = createAsyncThunk("users/updateUser", async ({ id, userData }: { id: string, userData: Partial<User> }, { rejectWithValue }) => {
    try {
        const response = await updateUser(id, userData);
        return { id, ...response };
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to update user");
    }
});

// Delete User
export const deleteUserThunk = createAsyncThunk("users/deleteUser", async (id: string, { rejectWithValue }) => {
    try {
        await deleteUser(id);
        return id;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to delete user");
    }
});

// User Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => { state.loading = false; state.users = action.payload; })
      .addCase(fetchUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => { state.users.push(action.payload); })

      .addCase(updateUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex((user) => user.email === action.payload.email);
        if (index !== -1) state.users[index] = action.payload;
      })

      .addCase(deleteUserThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter(user => user.email !== action.payload);
      });
  },
});

export default userSlice.reducer;
