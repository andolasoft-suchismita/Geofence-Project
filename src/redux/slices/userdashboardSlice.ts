import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserDashboardData } from "../../api/services/userdashboardService";

// Async thunk to fetch dashboard data
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (userId: string, { rejectWithValue }) => {
    try {
      return await fetchUserDashboardData(userId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetDashboardData: (state) => {
      return { data: null, loading: false, error: null }; // Reset state
    }, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || {};
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});



export const { resetDashboardData } = dashboardSlice.actions; 
export default dashboardSlice.reducer;


