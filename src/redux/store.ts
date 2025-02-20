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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Save state to localStorage
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;





