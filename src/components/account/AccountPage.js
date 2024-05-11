import { Typography, Box, Avatar, Card, CardContent, Button, CardActions, Grid } from "@mui/material";
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
import formatDate from "../formatDate";
import FavoritePodcasts from "../podcasts/FavoritePodcasts";

export default function AccountPage() {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const error = useSelector((state) => state.account.error);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.account.user);
    const token = localStorage.getItem("token");
    const { isOpen, message, type } = useSelector(state => state.alert);
    const [isOpenDialog, setIsOpenDialog] = useState(true);

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
        // navigate('/')
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
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center' }}>
                    <Box>
                        <Card variant="outlined" sx={{ width: 320, backgroundColor: '#222831', textAlign: 'center', p: 2, mb: 2, mt: 7 }}>
                            <CardContent>
                                <Avatar src={`${BASE_URL}avatars/${localStorage.getItem("avatar")}`} sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} />
                                <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
                                    {userData.name}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{ color: 'white' }}>
                                    Registered at: {(formatDate(userData.createdAt))}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center' }}>
                                <Button onClick={() => handleDeleteAccount()} sx={{ color: 'red', mx: 1 }}>Delete Account</Button>
                                <Button onClick={() => handleLogout()} variant="contained" color="primary" sx={{ mx: 1 }}>Logout</Button>
                            </CardActions>
                        </Card>
                        {isOpen && (
                            <Alert severity={type} sx={{ width: '200px', position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>{message}</Alert>
                        )}
                    </Box>
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item>
                           
                            <FavoritePodcasts></FavoritePodcasts>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <CustomDialog
                    title='You are not authorized'
                    subtitle='Please authorize'
                    isOpenDialog={isOpenDialog}
                    handleClose={() => setIsOpenDialog(false)}
                    children={<Button onClick={() => handleRedirectToAuthorize()} startIcon={<AccountCircleIcon />}>Authorize</Button>}
                />
            )}
        </>
    )
}
