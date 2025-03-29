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

// Get initial state from localStorage if available
const getInitialState = (): AttendanceState => {
  const savedState = localStorage.getItem('attendanceState');
  if (savedState) {
    const parsedState = JSON.parse(savedState);
    return {
      users: parsedState.users || {},
      isPunchedIn: parsedState.isPunchedIn || false
    };
  }
  return {
    users: {},
    isPunchedIn: false
  };
};

const initialState = getInitialState();

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
      localStorage.setItem('attendanceState', JSON.stringify(state));
    },
    initializeAttendanceState: (state) => {
      const savedState = localStorage.getItem('attendanceState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        state.users = parsedState.users || {};
        state.isPunchedIn = parsedState.isPunchedIn || false;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(punchIn.fulfilled, (state, action) => {
        const { user_id, id, check_in } = action.payload;
        if (!state.users[user_id]) state.users[user_id] = [];
        state.users[user_id].push({
          attendance_id: id,
          punchIn: check_in,
          coordinates: '',
          punchOut: null,
        });
        state.isPunchedIn = true;
        localStorage.setItem('attendanceState', JSON.stringify(state));
      })
      .addCase(punchOut.fulfilled, (state, action) => {
        const { user_id, check_out, id } = action.payload;
        const attendance = state.users[user_id]?.find(
          (entry) => entry.attendance_id === id
        );
        if (attendance) {
          attendance.punchOut = check_out;
        }
        state.isPunchedIn = false;
        localStorage.setItem('attendanceState', JSON.stringify(state));
        localStorage.removeItem('attendance_id');
      });
  },
});

export const { setPunchStatus, initializeAttendanceState } = attendanceSlice.actions;
export default attendanceSlice.reducer;
