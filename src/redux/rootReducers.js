import { combineReducers } from "redux";
//import slices here
import authSlice from "./slices/authSlice";

// Combine all reducers into one root reducer
const MainReducer = combineReducers({
  //Add Slices Here
  authSlice: authSlice,
});
 
// Define the root reducer function
const rootReducer = (state, action) => {
  // Pass the state and action to the combined reducer
  return MainReducer(state, action);
};
 
export default rootReducer;