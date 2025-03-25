// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getattendanceSummary, getattendanceReports } from "../../api/services/dashboardService";

// // Define the state interface
// interface DashboardState {
//   totalEmployees: number;
//   presentToday: number;
//   absenteesToday: number;
//   lateComingsToday: number;
//   departmentWiseAttendance: Record<string, Record<string, number>>;
//   overallAttendance: Record<string, number>;
//   monthlyReport: {
//     id: string;
//     employee_id: number;
//     name: string;
//     days_absent: number;
//     half_days: number;
//     deficit_hours: number;
//   }[];
//   loading: boolean;
//   error: string | null;
// }

// // Initial state
// const initialState: DashboardState = {
//   totalEmployees: 0,
//   presentToday: 0,
//   absenteesToday: 0,
//   lateComingsToday: 0,
//   departmentWiseAttendance: {},
//   overallAttendance: {},
//   monthlyReport: [],
//   loading: false,
//   error: null,
// };

// // Async thunk for fetching attendance summary
// export const fetchAttendanceSummary = createAsyncThunk(
//   "dashboard/fetchAttendanceSummary",
//   async (companyId: number, { rejectWithValue }) => {
//     try {
//       return await getattendanceSummary(companyId);
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to fetch summary");
//     }
//   }
// );

// // Async thunk for fetching monthly attendance report
// export const fetchAttendanceReports = createAsyncThunk(
//   "dashboard/fetchAttendanceReports",
//   async ({ companyId, month, year }: { companyId: number; month: string; year: number }, { rejectWithValue }) => {
//     try {
//       return await getattendanceReports(companyId, month, year);
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to fetch report");
//     }
//   }
// );

// // Create the slice
// const dashboardSlice = createSlice({
//   name: "dashboard",
//   initialState,
//   reducers: {
//     resetDashboardState: (state) => {
//       return initialState;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAttendanceSummary.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAttendanceSummary.fulfilled, (state, action) => {
//         state.loading = false;
//         state.totalEmployees = action.payload.total_employees;
//         state.presentToday = action.payload.present_today;
//         state.absenteesToday = action.payload.absentees_today;
//         state.lateComingsToday = action.payload.late_comings_today;
//         state.departmentWiseAttendance = action.payload.department_wise_attendance || {};
//         state.overallAttendance = action.payload.overall_attendance || {};
//       })
//       .addCase(fetchAttendanceSummary.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(fetchAttendanceReports.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAttendanceReports.fulfilled, (state, action) => {
//         state.loading = false;
//         state.monthlyReport = action.payload;
//       })
//       .addCase(fetchAttendanceReports.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// // Export actions and reducer
// export const { resetDashboardState } = dashboardSlice.actions;
// export default dashboardSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  name: "dashboardSlice",
  initialState,
  reducers: {
    // Action to set attendance summary
    setAttendanceSummary: (state, action: PayloadAction<DashboardState["attendanceSummary"]>) => {
      console.log("📊 Updating attendanceSummary in Redux:", action.payload);
      state.attendanceSummary = action.payload;
    },

    // Action to set monthly attendance report
    setMonthlyReport: (state, action: PayloadAction<DashboardState["monthlyReport"]>) => {
      console.log("📊 Updating monthlyReport in Redux:", action.payload);
      state.monthlyReport = action.payload;
    },
  },
});

// Export actions and reducer
export const { setAttendanceSummary, setMonthlyReport } = dashboardSlice.actions;
export default dashboardSlice.reducer;



