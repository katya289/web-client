import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import api from "../../api";
import { useNavigate } from 'react-router-dom';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import BusinessIcon from '@mui/icons-material/Business';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SchoolIcon from '@mui/icons-material/School';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Grid } from "@mui/material";

export default function Search() {
    const navigate = useNavigate();

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: '600px',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const categories = [
        { name: 'Arts', icon: <AutoAwesomeIcon /> },
        { name: 'Comedy', icon: <TheaterComedyIcon /> },
        { name: 'Education', icon: <SchoolIcon /> },
        { name: 'Sports', icon: <FitnessCenterIcon /> },
        { name: 'News', icon: <NewspaperIcon /> },
        { name: 'Business', icon: <BusinessIcon /> },
    ];

    const handleCardClick = (item) => {
        navigate('/category/details', { state: { category: item } });
    }

    return (
        <Box sx={{ display: 'flex', alignContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', justifyContent: 'center' }} ml={17} mt={5}>
            <Grid container sx={{ justifyContent: 'center' }}>
                {categories.map((item, index) => (
                    <Grid item xs={12} sm={2} md={4} key={index}>
                        <Paper onClick={() => handleCardClick(item.name)} key={index}
                            sx={{
                                backgroundColor: '#222831',
                                width: 250,
                                height: '120px',
                                padding: 2,
                                borderRadius: 3,
                                "&:hover": {
                                    boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.3)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)'
                                },
                                transition: 'box-shadow 0.3s ease',
                                m: 4
                            }} elevation={6}>
                            <Typography color={'white'}>
                                {item.name}
                                <Box sx={{ color: 'white' }}>{item.icon}</Box>
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
