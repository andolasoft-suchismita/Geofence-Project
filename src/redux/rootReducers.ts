import { combineReducers } from "@reduxjs/toolkit";
//import slices here
import authSlice from "./slices/authSlice";
import userReducer from "./slices/userSlice"; //  Import userSlice
import companyReducer from './slices/companySlice'; 
// Combine all reducers into one root reducer
const MainReducer = combineReducers({
  //Add Slices Here
  authSlice: authSlice,
  users: userReducer, //  Add userSlice
  company: companyReducer, // ✅ Ensure key is "company"
});
 
// Define the root reducer function
const rootReducer = (state, action) => {
  // Pass the state and action to the combined reducer
  return MainReducer(state, action);
};
export type RootState = ReturnType<typeof rootReducer>; // ✅ Export RootState type
export default rootReducer;