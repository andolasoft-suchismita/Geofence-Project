import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  createUserAPI,
  fetchUsersAPI,
  updateUserAPI,
  deleteUserAPI,
  fetchUserDetailsAPI,
} from '../../api/services/userService';

// Define User Interface
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string; // Optional field
  gender?: string;
  marital_status?: string;
  blood_group?: string;
  emergency_contact?: string;
  address?: string;
  employee_id: number;
  company_name?: string;
  designation?: string;
  roletype: string;
  employee_type?: string;
  department?: string;
  doj: string;
  dob: string;
}

// Define Initial State
interface UserState {
  users: User[];
  selectedUser: User | null; //  Added this to store fetched user details
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null, //  Initialize selected user as null
  loading: false,
  error: null,
};

// Fetch Users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (company_id: number, { rejectWithValue }) => {
    try {
      const response = await fetchUsersAPI(company_id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch users');
    }
  }
);

// Create User
export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await createUserAPI(userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to create user');
    }
  }
);

// Update User
export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  async (
    { id, userData }: { id: string; userData: Partial<User> },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateUserAPI(id, userData);
      return { id, ...response };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to update user');
    }
  }
);

// Delete User
export const deleteUserThunk = createAsyncThunk(
  'users/deleteUser',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteUserAPI(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete user');
    }
  }
);
// Fetch User Details by ID
export const fetchUserDetails = createAsyncThunk(
  'users/fetchUserDetails',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetchUserDetailsAPI(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch user details'
      );
    }
  }
);

// User Slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })

      .addCase(
        updateUserThunk.fulfilled,
        (state, action: PayloadAction<User>) => {
          const index = state.users.findIndex(
            (user) => user.id === action.payload.id
          );
          if (index !== -1) state.users[index] = action.payload;
        }
      )

      .addCase(
        deleteUserThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.users = state.users.filter(
            (user) => user.id !== action.payload
          ); // Use `user.id`
        }
      )
      //  Handle fetching user details
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserDetails.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.selectedUser = action.payload; // Store fetched user details
        }
      )
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
