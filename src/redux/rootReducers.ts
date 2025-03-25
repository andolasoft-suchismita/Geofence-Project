import { combineReducers } from "@reduxjs/toolkit";
//import slices here
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import userReducer from "./slices/userSlice"; //  Import userSlice
import companyReducer from './slices/companySlice'; 
import dashboardSlice from "./slices/dashboardSlice";
// Combine all reducers into one root reducer
import attendanceReducer from './slices/attendanceSlice';

const MainReducer = combineReducers({
  //Add Slices Here
  authSlice: authSlice,
  userSlice: userSlice,
  users: userReducer, //  Add userSlice
  company: companyReducer, // ✅ Ensure key is "company"
  attendance: attendanceReducer,
  dashboard:dashboardSlice,
});
 
// Define the root reducer function
const rootReducer = (state, action) => {
  // Pass the state and action to the combined reducer
  return MainReducer(state, action);
};
export type RootState = ReturnType<typeof rootReducer>; // ✅ Export RootState type
export default rootReducer;