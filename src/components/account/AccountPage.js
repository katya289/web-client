import { Typography, Box, Avatar, Card, CardContent, Button, CardActions } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAccountData } from "../../features/account/accountSlice";
import { useEffect, useState } from "react";
import { CustomDialog } from "../CustomDialog";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { BASE_URL } from "../constants";
import api from "../../api";
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { setAlert, clearAlert } from "../../features/alert/alertSlice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function AccountPage() {
    const [userData, setUserData] = useState({});
    // const [isOpen, setIsOpen] = useState(false);
    // const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    // const navigate = useNavigate();
    const error = useSelector((state) => state.account.error);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.account.user);
    const token = localStorage.getItem("token");
    const { isOpen, message, type } = useSelector(state => state.alert);
    const [isOpenDialog, setIsOpenDialog] = useState(true);
    const handleClose = () => {
        setIsOpenDialog(false);
        navigate('/')
    }
   
    useEffect(() => {
        dispatch(getAccountData(token))
            .then((result) => {
                console.log(result.payload.user);
                setUserData(result.payload.user);
            })
            .catch(() => {
                // setIsOpen(true);
            });
        if (isOpen) {
            setTimeout(() => {
                dispatch(clearAlert());

                navigate('/');

            }, 4500);
        }
    }, [dispatch, token, isOpen, dispatch, navigate]);
   
    const handleLogout = async () => {
        localStorage.clear();
        dispatch(setAlert({ message: "Logouted", type: 'success' }));
        navigate('/')
    }
    const handleDeleteAccount = async () => {
        try {
            await api.delete('/account/delete');
            localStorage.clear();
            dispatch(setAlert({ message: "Successfully deleted account", type: 'success' }));
        } catch (error) {
            console.error(error);
            dispatch(setAlert({ message: "Failed to delete account", type: 'error' }));
        }
    }
    const handleRedirectToAuthorize = () => {
        navigate('/login')
    }
    return (
        <>
            {localStorage.getItem("token") ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', height: '500px', mt: 5 }}>
                    <Card variant="outlined"
                        sx={{
                            width: 320, backgroundColor: '#222831'
                        }}>
                        <CardContent>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center', flexDirection: 'column', color: 'white'
                            }}>
                                <Avatar src={`${BASE_URL}avatars/${localStorage.getItem("avatar")}`}></Avatar>
                                <Typography>Username: {userData.name}</Typography>
                                <Typography>Register date: {userData.createdAt}</Typography>

                            </Box>
                            <Button onClick={() => handleDeleteAccount()}>Delete account</Button>
                            <Button onClick={() => handleLogout()}>Logout</Button>
                        </CardContent>


                    </Card>
                    {isOpen && (
                        <Alert severity={type} sx={{ width: '200px', position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>{message} </Alert>
                    )}

                </Box>
            ) : <CustomDialog title='You are not authorized'
                subtitle='Please authorize'
                isOpenDialog={isOpenDialog} handleClose={handleClose}
                children={<Button onClick={() => handleRedirectToAuthorize()} startIcon={<AccountCircleIcon/>}>Authorize</Button>}
            ></CustomDialog>}


        </>


    )
}
