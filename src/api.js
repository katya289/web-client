import axios from "axios";
import { BASE_URL } from "./components/constants";
const api = axios.create({
    baseURL: `${BASE_URL}api`,

});


api.interceptors.request.use((config) => {
    const userToken = localStorage.getItem('token');
    if (userToken){
        config.headers.Authorization = `Bearer ${userToken}`;
        // console.log(userToken);
    }

    return config;
});

export default api;