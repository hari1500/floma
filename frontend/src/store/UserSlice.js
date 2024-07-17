import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import config from "../config";

export const userLogin = createAsyncThunk(
    "user/userLogin",
    async (creds) => {
        const req = await axios.post(config.loginUrl, creds, { withCredentials: true });
        localStorage.setItem("user", JSON.stringify(req.data));
        return req.data;
    },
);

export const userRegister = createAsyncThunk(
    "user/userRegister",
    async (creds) => {
        const req = await axios.post(config.registerUrl, creds, { withCredentials: true });
        return req.data;
    },
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                console.error(action.error);
                if (action.error.message === "Request failed with status code 401") {
                    state.error = "Access Denied! Invalid credentials";
                } else {
                    state.error = action.error.message;
                }
            })
            .addCase(userRegister.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(userRegister.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.error = null;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                console.error(action.error);
                if (action.error.message === "Request failed with status code 409") {
                    state.error = "Username already exists";
                } else {
                    state.error = action.error.message;
                }
            })
    }
});

export default userSlice.reducer;
