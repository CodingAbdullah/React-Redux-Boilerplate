import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../service/authService";

// Retrieve user from localStorage if it exists, to persist data
let user = localStorage.getItem('user');

// Setting up actions and slice for state management through reducers
export const login = createAsyncThunk(
    'auth/login',
    async (state, thunkAPI) => {
        try {
            return authService.login(state);
        }
        catch (err) {
            return thunkAPI.returnWithValue(err);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        return authService.logout();
    }
);

let authSlice = createSlice({
    name : 'auth',
    initialState : {
        user: user ? JSON.parse(user) : null,
        isLoading: false,
        isSuccess: false,
        error: false,
        token: null
    },
    reducers : {
        // Reset indicators to empty values
        reset : (state) => {
            state.isLoading = false;
            state.error = false;
            state.isSuccess = false;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(login.pending, (state) => {
            state.user = null;
            state.isLoading = true;
            state.isSuccess = false;
            state.error = false;
            state.token = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoading = false;
            state.error = false;
            state.isSuccess = true;
            state.token = action.payload.token;
        })
        .addCase(login.rejected, (state, action) => {
            state.user = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.error = action.error;
            state.token = null;
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.error = false;
            state.token = null;
        })
    }
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;