import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import axios from "axios";
import { BASE_URL } from "../../components/constants";



export const registerUser = createAsyncThunk(
    'user/RegisterUser',
    async (userCredentials) => {
        console.log(userCredentials)
        // const request = await api.post(`users/register`, userCredentials);
        const request = await axios.post(`${BASE_URL}api/users/register`, userCredentials);
        const response = await request.data;
        console.log(response.data)
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
                state.error = action.error;
                state.user = null
            })
    }
})


export default registerSlice.reducer;