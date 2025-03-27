import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { punchInAPI, punchOutAPI } from '../../api/services/attendanceService';

interface PunchData {
  attendance_id: string; // Add this
  punchIn?: string;
  punchOut?: string;
  coordinates?: string;
}

interface AttendanceState {
  // [user_id: string]: PunchData[];
  users: { [user_id: string]: PunchData[] };
  isPunchedIn: boolean
}

const initialState: AttendanceState = {
  users: {},
  isPunchedIn: false
};

// Async Thunks for API Calls

export const punchIn = createAsyncThunk(
  'attendance/punchIn',
  async (
    { lat, lng, check_in }: { lat: number; lng: number; check_in: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await punchInAPI(check_in, lat, lng);
      return response;
    } catch (error: any) {
      console.error('Punch In API Error:', error.response?.data);
      return rejectWithValue(error.response?.data || 'Unknown error');
    }
  }
);

export const punchOut = createAsyncThunk(
  'attendance/punchOut',
  async (
    { attendance_id, check_out }: { attendance_id: string; check_out: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await punchOutAPI(attendance_id, check_out);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setPunchStatus: (state, action) => {
      state.isPunchedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(punchIn.fulfilled, (state, action) => {
        const { user_id, id, check_in } = action.payload; //  Get attendance_id
        if (!state[user_id]) state[user_id] = [];
        state[user_id].push({
          attendance_id: id, //  Store attendance_id
          punchIn: check_in,
          coordinates: '',
          punchOut: null,
        });
        state.isPunchedIn = true;
      })
      .addCase(punchOut.fulfilled, (state, action) => {
        const { user_id, check_out, id } = action.payload; //  Get updated attendance_id
        const attendance = state[user_id]?.find(
          (entry) => entry.attendance_id === id
        );
        if (attendance) {
          attendance.punchOut = check_out;
        }
        state.isPunchedIn = false;
      });
  },
});

export const { setPunchStatus } = attendanceSlice.actions;
export default attendanceSlice.reducer;
