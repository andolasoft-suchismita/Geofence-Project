import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHolidays } from "../../api/services/holidayService";

export const getHolidays = createAsyncThunk("holidays/fetchHolidays", async () => {
  const response = await fetchHolidays();
  return response; // Assuming fetchHolidays() returns an array of events
});

const holidaySlice = createSlice({
  name: "holidays",
  initialState: {
    holidayList: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHolidays.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHolidays.fulfilled, (state, action) => {
        state.loading = false;
        state.holidayList = action.payload;
      })
      .addCase(getHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default holidaySlice.reducer;
