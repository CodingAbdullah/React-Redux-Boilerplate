import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';

// Configure store for global state management
export const store = configureStore({
    reducer : {
        auth: authReducer
    }
});