import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../components/constants";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userCredentials) => {
        const request = await axios.post(`${BASE_URL}api/authorize`, userCredentials);
        const response = await request.data;
        localStorage.setItem("token", response.token);
        return response;
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: null,
        error: null
    },
    extraReducers:(builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.user = null;
            state.error = null;

        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = true;
            // console.log(action.error.message);
            // state.error = action.error.message;
            state.error = "Invalid credentials";
            state.user = null;
        })
    }
})


export default authSlice.reducer;