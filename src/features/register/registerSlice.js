import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";




export const registerUser = createAsyncThunk(
    'user/RegisterUser',
    async (userCredentials) => {
        const request = await api.post(`/register`, userCredentials);
        const response = await request.data;
        console.log(response)
        localStorage.setItem("token", response.token);
        return response;
    }
)


const registerSlice = createSlice({
    name: 'register',
    initialState: {
        user: null,
        error: null,
        loading: false

    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;

            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = true;
                console.log(action.error);
                state.error = action.error.message;
                state.user = null
            })
    }
})


export default registerSlice.reducer;