import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../authService/authService";

// Retrieve user from localStorage if it exists, to persist data
let user = localStorage.getItem('user');


// Setting up actions and slice for state management through reducers
export const login = createAsyncThunk({
    name: 'auth/login',
    payloadCreator : (state, thunkAPI) => {
        try {
            return authService.signup(state);
        }
        catch (err) {
            return thunkAPI.returnWithValue(err);
        }
    }
});

export const logout = createAsyncThunk({
    name : 'auth/logout',
    payloadCreator : (_, thunkAPI) => {
        try {
            return authService.logout();
        }
        catch(err) {
            return thunkAPI.returnWithValue(err);
        }
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState : {
        user: user ? JSON.parse(user) : null,
        token: null,
        isLoading: false,
        isSuccess: false,
        isError: false
    },
    reducers : {
        reset : (state) => {
            state.isLoading = false
            state.isSuccess = false;
            state.isError = false;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.user = null;
            state.token = null;
        })
        .addCase(login.fufilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.error;
            state.isSuccess = false;
            state.user = null;
            state.token = null;
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.token = null
        })
    }
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;