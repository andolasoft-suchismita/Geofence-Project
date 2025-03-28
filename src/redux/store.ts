import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducers";


// Load state from localStorage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

// Initialize store with persisted state
const persistedState = loadState();


const store = configureStore({
    reducer:rootReducer,
    preloadedState: persistedState,

});

// Save state to localStorage
store.subscribe(() => {
    const state = store.getState();
    const stateToPersist = {
        authSlice: state.authSlice, // Persist only necessary parts
        userSlice: state.userSlice,
    };
    localStorage.setItem("reduxState", JSON.stringify(stateToPersist));
    console.log(" Updated Redux Store:", store.getState());
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



export default store;





