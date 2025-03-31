import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userInfo: Record<string, any> | null;
}

const initialState: UserState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    // Action to set user information in the Redux store
    setUserInfo: (state, action: PayloadAction<Record<string, any>>) => {
      state.userInfo = action.payload;
      
    },

    // Action to update user role after profile update
    updateRole: (state, action: PayloadAction<{ roletype: string }>) => {
      if (state.userInfo) {
        state.userInfo.role = action.payload.roletype.trim().toLowerCase(); // ✅ Normalize role
        // console.log("Updated Role in Redux:", state.userInfo.role);
      }
    },
  },
});

export const { setUserInfo, updateRole } = userSlice.actions;
export default userSlice.reducer;

 




// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import {
//   createUserAPI,
//   fetchUsersAPI,
//   updateUserAPI,
//   deleteUserAPI,
// } from '../../api/services/userService';

// // Define User Interface
// export interface User {
//   id: string; // Add ID field (generated by backend)
//   first_name: string;
//   last_name: string;
//   email: string;
//   roletype: string;
//   doj: string;
//   dob: string;
//   designation: string;
//   hashed_password: string;
//   gender: string; // Added missing field
//   employee_type: string; // Added missing field
// }

// // Define Initial State
// interface UserState {
//   users: User[];
//   currentUser: User | null; // Track logged-in user
//   roletype: string | null; // ✅ NEW: Add roleType to store user role
//   isFirstLogin: boolean; // Track first-time login
//   loading: boolean;
//   error: string | null;
// }

// const initialState: UserState = {
//   users: [],
//   currentUser: null,
//   roletype: "",
//   isFirstLogin: true, // ✅ First-time login default
//   loading: false,
//   error: null,
// };




// // Fetch Users
// export const fetchUsers = createAsyncThunk(
//   'users/fetchUsers',
//   async (company_id: number, { rejectWithValue }) => {
//     try {
//       const response = await fetchUsersAPI(company_id);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch users');
//     }
//   }
// );

// // Create User
// export const createUser = createAsyncThunk(
//   'users/createUser',
//   async (userData: User, { rejectWithValue }) => {
//     try {
//       const response = await createUserAPI(userData);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'Failed to create user');
//     }
//   }
// );

// // Update User
// export const updateUserThunk = createAsyncThunk(
//   'users/updateUser',
//   async (
//     { id, userData }: { id: string; userData: Partial<User> },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await updateUserAPI(id, userData);
//       return { id, ...response };
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'Failed to update user');
//     }
//   }
// );

// // Delete User
// export const deleteUserThunk = createAsyncThunk(
//   'users/deleteUser',
//   async (id: string, { rejectWithValue }) => {
//     try {
//       await deleteUserAPI(id);
//       return id;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'Failed to delete user');
//     }
//   }
// );

// // User Slice
// const userSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {
//     updateCurrentUser: (state, action: PayloadAction<User>) => {
//       state.currentUser = action.payload;
//       state.roletype = action.payload.roletype;
//       state.isFirstLogin = false; // ✅ Once logged in, disable first-time login
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
//         state.loading = false;
//         state.users = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
//         state.users.push(action.payload);
//       })

//       .addCase(
//         updateUserThunk.fulfilled,
//         (state, action: PayloadAction<User>) => {
//           const index = state.users.findIndex(
//             (user) => user.id === action.payload.id
//           );
//           if (index !== -1) state.users[index] = action.payload;
//         }
//       )

//       .addCase(
//         deleteUserThunk.fulfilled,
//         (state, action: PayloadAction<string>) => {
//           state.users = state.users.filter(
//             (user) => user.id !== action.payload
//           ); // Use `user.id`
//         }
//       )
  

//   // ✅ Handle fetchCurrentUser
//   .addCase(fetchCurrentUser.pending, (state) => {
//     state.loading = true;
//     state.error = null;
//   })
//   .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
//     state.loading = false;
//     state.currentUser = action.payload;
//     state.roletype = action.payload.roletype; // ✅ NEW: Store role from API response
//   })
//   .addCase(fetchCurrentUser.rejected, (state, action) => {
//     state.loading = false;
//     state.error = action.payload as string;
//   });
// },

// });

// export const { updateCurrentUser } = userSlice.actions; // ✅ Export updateCurrentUser
// export default userSlice.reducer;
