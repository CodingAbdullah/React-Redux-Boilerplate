import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'authentication',
    state: initialState,
    reducers : {
        login: (state, payload) => {
            state.isLoggedIn = true;
            state.user = payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = {};
        }
    }
});

export const loginAction = authSlice.actions;
export const loginReducer = authSlice.reducer;