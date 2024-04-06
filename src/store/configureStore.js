
import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import registerSlice from "../features/register/registerSlice";
import accountSlice from "../features/account/accountSlice";
import alertSlice from "../features/alert/alertSlice";



const store = configureStore({
    reducer: {
        auth: authSlice,
        register: registerSlice,
        account: accountSlice,
        alert: alertSlice
    }
})



export default store;