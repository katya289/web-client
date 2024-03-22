
import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import registerSlice from "../features/register/registerSlice";
import accountSlice from "../features/account/accountSlice";




const store = configureStore({
    reducer: {
        auth: authSlice,
        register: registerSlice,
        account: accountSlice,
    }
})



export default store;