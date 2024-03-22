import { Typography, Box, Avatar, Card, CardContent, Button, CardActions } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAccountData } from "../../features/account/accountSlice";
import { useEffect, useState } from "react";
import { CustomDialog } from "../CustomDialog";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export default function AccountPage() {
    const [userData, setUserData] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const error = useSelector((state) => state.account.error);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.account.user);
    const token = localStorage.getItem("token");

    useEffect(() => {
        dispatch(getAccountData(token))
            .then((result) => {
                console.log(result.payload);
                setUserData(result.payload);
            })
            .catch(() => {
                setIsOpen(true);
            });
    }, [dispatch, token]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card variant="outlined"
                sx={{
                    width: 320,
                  
                    
                }}>

                <CardContent>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Avatar src={`http://127.0.0.1:8000/storage/${localStorage.getItem("avatar")}`}></Avatar>
                        <Typography>{userData.name}</Typography>
                        <Typography>Register date: {userData.created_at}</Typography>
                    </Box>
                </CardContent>


            </Card>
           
        </Box>
    )
}
