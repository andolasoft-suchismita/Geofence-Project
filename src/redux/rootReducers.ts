// import { combineReducers } from "@reduxjs/toolkit";
// //import slices here
// import authSlice from "./slices/authSlice";
// import userSlice from "./slices/userSlice";
// import userReducer from "./slices/userSlice"; //  Import userSlice
// import companyReducer from './slices/companySlice'; 
// import dashboardSlice from "./slices/dashboardSlice";
// // Combine all reducers into one root reducer
// import attendanceReducer from './slices/attendanceSlice';
// import profileReducer from "./slices/profileSlice";
// import holidayReducer from './slices/holidaySlice';
// import dashboardReducer from "./slices/userdashboardSlice";
// // import dashboardSlice from "./slices/dashboardSlice";



// const MainReducer = combineReducers({
//   //Add Slices Here
//   authSlice: authSlice,
//   userSlice: userSlice,
//   users: userReducer, //  Add userSlice
//   company: companyReducer, //  Ensure key is "company"
//   attendance: attendanceReducer,
//   dashboard:dashboardSlice,
//   profile: profileReducer,
//   holidays: holidayReducer,

  

//   userdashboard: dashboardReducer,
 
// });
 
// // Define the root reducer function
// const rootReducer = (state, action) => {
//   // Pass the state and action to the combined reducer
//   return MainReducer(state, action);
// };
// export type RootState = ReturnType<typeof rootReducer>; // Export RootState type
// export default rootReducer;

import { combineReducers } from "@reduxjs/toolkit";
// Import slices here
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import companyReducer from './slices/companySlice';
import dashboardSlice from "./slices/dashboardSlice";
import attendanceReducer from './slices/attendanceSlice';
import profileReducer from "./slices/profileSlice";
import holidayReducer from './slices/holidaySlice';
import dashboardReducer from "./slices/userdashboardSlice";

// Combine all reducers into one root reducer
const MainReducer = combineReducers({
  authSlice,
  userSlice,
  users: userSlice,
  company: companyReducer,
  attendance: attendanceReducer,
  dashboard: dashboardSlice,
  profile: profileReducer,
  holidays: holidayReducer,
  userdashboard: dashboardReducer,
});

// Define the root reducer function
const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/logout") {
    // Clear everything from Redux & Local Storage on logout
    localStorage.removeItem("reduxState");
    return MainReducer(undefined, action);
  }
  return MainReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>; // Export RootState type
export default rootReducer;
