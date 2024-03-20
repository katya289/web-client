
import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import registerSlice from "../features/register/registerSlice";




const store = configureStore({
    reducer: {
        auth: authSlice,
        register: registerSlice,
    }
})



export default store;