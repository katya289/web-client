import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../../api";


export const getAccountData = createAsyncThunk(
    'user/getAccountData',
    async() => {
        const token = localStorage.getItem("token");
        const request = api.get('/account');
        const response = (await request).data;
        console.log(response)
        return response;
    }
) 


const accountSlice = createSlice({
    name: 'account',
    initialState: {
        loading: true,
        error: false,
        user: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAccountData.fulfilled, (state, action) => {
            state.error = false;
            state.user = action.payload;
            state.loading = false;
        })
        .addCase(getAccountData.rejected, (state) => {
            state.error = "Error";
            state.user = null;
            state.loading = true;
        })
    }
})


export default accountSlice.reducer;