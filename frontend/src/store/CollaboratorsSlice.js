import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import config from "../config";

export const getCollaborators = createAsyncThunk(
    "collaborators/getCollaborators",
    async () => {
        const req = await axios.get(config.collaboratorsUrl, { withCredentials: true });
        return req.data;
    },
);

const collaboratorsSlice = createSlice({
    name: "collaborators",
    initialState: {
        loading: false,
        collaborators: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCollaborators.pending, (state) => {
                state.loading = true;
                state.collaborators = null;
                state.error = null;
            })
            .addCase(getCollaborators.fulfilled, (state, action) => {
                state.loading = false;
                state.collaborators = action.payload;
                state.error = null;
            })
            .addCase(getCollaborators.rejected, (state, action) => {
                state.loading = false;
                state.collaborators = null;
                console.error(action.error);
                state.error = action.error.message;
            })
    }
});

export default collaboratorsSlice.reducer;
