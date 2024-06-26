import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { CustomDialog } from '../CustomDialog';

import { clearAlert, setAlert } from '../../features/alert/alertSlice';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import Alert from '@mui/material/Alert';

export default function SignIn() {
    // const [isOpen, setIsOpen] = React.useState(false);
    const [token, setToken] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const { isOpen, message, type } = useSelector(state => state.alert);
    const navigate = useNavigate();
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                dispatch(clearAlert());

                if (!error) {
                    navigate('/');
                }
            }, 4500);
        }
    }, [isOpen, error, dispatch, navigate]);



    const handleSubmit = async (event) => {
        event.preventDefault();
        const userCredentials = { email, password }
        dispatch(loginUser(userCredentials)).then((result) => {
            if (result.payload) {
                console.log(result.payload)
                setToken(result.payload.accessToken);
                localStorage.setItem("token", result.payload.accessToken)
                localStorage.setItem('sessionId', result.payload.sessionId);


                setEmail('')
                setPassword('')

                dispatch(setAlert({ message: 'Authorization successfull!', type: 'success' }));

            }
            else {
                dispatch(setAlert({ message: error, type: 'error' }));

            }

        })

    };
    return (
        <>
            <ThemeProvider theme={createTheme()}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link component="button" variant="body2" onClick={() => { navigate('/register') }}>
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
            {/* <CustomDialog isOpen={isOpen} title="Error" handleClose={handleDialogClose}>
                <p>{error}</p>
            </CustomDialog> */}
            {isOpen && (
                <Alert severity={type} sx={{ width: '200px', position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>{message} </Alert>
            )}
        </>
    );
}


