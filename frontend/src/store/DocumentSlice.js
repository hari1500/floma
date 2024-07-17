import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import config from "../config";

export const getDocs = createAsyncThunk(
    "document/getDocs",
    async () => {
        const req = await axios.get(config.getDocumentsUrl, { withCredentials: true });
        return req.data;
    },
);

export const getDoc = createAsyncThunk(
    "document/getDoc",
    async (docId) => {
        const req = await axios.get(`${config.getDocumentUrl}?docId=${docId}`, { withCredentials: true });
        return req.data;
    },
);

export const createDoc = createAsyncThunk(
    "document/createDoc",
    async () => {
        const req = await axios.post(config.createDocumentUrl, null, { withCredentials: true });
        return req.data;
    },
);

export const updateDoc = createAsyncThunk(
    "document/updateDoc",
    async (doc) => {
        const req = await axios.put(config.updateDocumentUrl, doc, { withCredentials: true });
        return req.data;
    },
);

const documentSlice = createSlice({
    name: "document",
    initialState: {
        loading: false,
        documents: null,
        currDocument: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDocs.pending, (state) => {
                state.loading = true;
                state.documents = null;
                state.error = null;
            })
            .addCase(getDocs.fulfilled, (state, action) => {
                state.loading = false;
                state.documents = action.payload;
                state.error = null;
            })
            .addCase(getDocs.rejected, (state, action) => {
                state.loading = false;
                state.documents = null;
                state.error = action.error.message;
            })
            .addCase(getDoc.pending, (state) => {
                state.loading = true;
                state.currDocument = null;
                state.error = null;
            })
            .addCase(getDoc.fulfilled, (state, action) => {
                state.loading = false;
                state.currDocument = action.payload;
                state.error = null;
            })
            .addCase(getDoc.rejected, (state, action) => {
                state.loading = false;
                state.currDocument = null;
                state.error = action.error.message;
            })
            .addCase(createDoc.pending, (state) => {
                state.loading = true;
                state.currDocument = null;
                state.error = null;
            })
            .addCase(createDoc.fulfilled, (state, action) => {
                state.loading = false;
                state.currDocument = action.payload;
                state.error = null;
            })
            .addCase(createDoc.rejected, (state, action) => {
                state.loading = false;
                state.currDocument = null;
                state.error = action.error.message;
            })
            .addCase(updateDoc.pending, (state) => {
                state.loading = true;
                state.currDocument = null;
                state.error = null;
            })
            .addCase(updateDoc.fulfilled, (state, action) => {
                state.loading = false;
                state.currDocument = action.payload;
                state.error = null;
            })
            .addCase(updateDoc.rejected, (state, action) => {
                state.loading = false;
                state.currDocument = null;
                state.error = action.error.message;
            })
    }
});

export default documentSlice.reducer;
