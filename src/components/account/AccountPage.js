import { Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAccountData } from "../../features/account/accountSlice";
import { useEffect, useState } from "react";
import { CustomDialog } from "../CustomDialog";





export default function AccountPage() {
    const [userData, setUserData] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const error = useSelector((state) => state.account.error);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.account.user);
    const token = localStorage.getItem("token");

    useEffect(() => {
        dispatch(getAccountData(token)).then((result) => {
            setUserData(result.payload);
        }).catch(() => {
            setIsOpen(true)
        })
    }, [dispatch, token]); 

    return (
        <>
            <Typography>Account</Typography>
            <Box>
            
                <Typography>{userData.name}</Typography>
                <Typography>Register date: {userData.created_at}</Typography>
            </Box>
           
                <CustomDialog isOpen={isOpen} title="Error">{error}</CustomDialog>
            
        </>
    )
}
