// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import AttendanceTable from "components/Attendancetable";

// interface AttendanceState {
//     id: number;
//     user_id: string;
//     date: string;
//     check_in: string;
//     check_out: string;
//     status: string;
// }

// const initialState: AttendanceState = {
//  checkInData: AttendanceState | null;
// };

// const attendanceSlice = createSlice({
//   name: "attendance",
//   initialState,
//   reducers: {
//     setCheckIn: (
//       state,
//       action: PayloadAction<{ checkInTime: string | null; message: string }>
//     ) => {
//       state.checkInTime = action.payload.checkInTime;
//       state.message = action.payload.message;
//     },
//   },
// });

// export const { setCheckIn } = attendanceSlice.actions;
// export default attendanceSlice.reducer;

// 

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AttendanceState {
  checkInData: any; // Change to specific type if possible
}

const initialState: AttendanceState = {
  checkInData: null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setCheckInData: (state, action: PayloadAction<any>) => {
      state.checkInData = action.payload;
    },
  },
});

export const { setCheckInData } = attendanceSlice.actions;
export default attendanceSlice.reducer;
