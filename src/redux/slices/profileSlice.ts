import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById, updateUser } from "../../api/services/profileService";

interface ProfileState {
  user: any; // Adjust this type according to your actual user structure
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
};

// ✅ Async Thunk to Fetch User Profile
export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      const data = await getUserById(userId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Async Thunk to Update Profile
export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async ({ userId, updatedData }: { userId: string; updatedData: any }, { rejectWithValue }) => {
    try {
      await updateUser(userId, updatedData);
      return updatedData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Create Profile Slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {}, // You can add manual reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;
