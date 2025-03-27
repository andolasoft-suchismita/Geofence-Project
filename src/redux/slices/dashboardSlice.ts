
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Define the state interface
interface DashboardState {
  attendanceSummary: {
    total_employees: number;
    present_today: number;
    absentees_today: number;
    late_comings_today: number;
    department_wise_attendance: Record<string, Record<string, number>>;
    overall_attendance: Record<string, number>;
  } | null;
  monthlyReport: {
    id: string;
    employee_id: number;
    name: string;
    days_absent: number;
    half_days: number;
    deficit_hours: number;
  }[];
}

// Initial state
const initialState: DashboardState = {
  attendanceSummary: null,
  monthlyReport: [],
};

// Create the slice
const dashboardSlice = createSlice({

  name: 'dashboardSlice',
  initialState,
  reducers: {
    // Action to set attendance summary
    setAttendanceSummary: (
      state,
      action: PayloadAction<DashboardState['attendanceSummary']>
    ) => {
      console.log('📊 Updating attendanceSummary in Redux:', action.payload);

      state.attendanceSummary = action.payload;
    },

    // Action to set monthly attendance report

    setMonthlyReport: (
      state,
      action: PayloadAction<DashboardState['monthlyReport']>
    ) => {
      console.log('📊 Updating monthlyReport in Redux:', action.payload);

      state.monthlyReport = action.payload;
    },
  },
});

// Export actions and reducer

export const { setAttendanceSummary, setMonthlyReport } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;

