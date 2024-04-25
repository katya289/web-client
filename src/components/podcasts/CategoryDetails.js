import React, { useEffect, useState } from "react";
import api from "../../api";
import { useLocation } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography, Paper, IconButton, InputBase, CardActions, Button } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from "@mui/material/Badge";
import VideoDialog from "../mainPage/VideoDetailsDialog";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from "react-redux";
import Alert from '@mui/material/Alert';
import { setAlert, clearAlert } from "../../features/alert/alertSlice";

export default function CategoryDetails() {
    const { isOpen, message, type } = useSelector(state => state.alert);
    const dispatch = useDispatch();
    const location = useLocation();
    const [podcasts, setPodcasts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredPodcasts, setFilteredPodcasts] = useState([]);
    const [videoShow, setVideoShow] = useState(false);
    const [podcastId, setPodcastId] = useState("");
    const [likesState, setLikesState] = useState({});

    useEffect(() => {
        const category = location.state.category;
        const fetchPodcasts = async () => {
            try {
                const response = await api.get(`/by-category/${category}`);
                setPodcasts(response.data.podcasts);
                initializeLikesState(response.data.podcasts);
            } catch (error) {
                console.error('Error fetching podcasts:', error);
            }
        };

        fetchPodcasts();
    }, [location.state.category]);

    const initializeLikesState = (podcasts) => {
        const initialLikesState = {};
        podcasts.forEach(podcast => {
            initialLikesState[podcast.id] = false;
        });
        setLikesState(initialLikesState);
    };

    const handleSearch = debounce((event) => {
        const searchText = event.target.value.toLowerCase();
        setSearchText(searchText);
        const filtered = podcasts.filter(podcast =>
            podcast.name.toLowerCase().includes(searchText) ||
            podcast.description.toLowerCase().includes(searchText)
        );
        setFilteredPodcasts(filtered);
    }, 800);

    const handleLikeClick = (id) => {
        if (likesState[id]) {
            api.delete(`podcasts/like-delete/${id}`)
                .then(() => {
                    setLikesState(prevState => ({
                        ...prevState,
                        [id]: false
                    }));
                })
                .catch(error => {
                    console.error(error);
                    // dispatch(setAlert({ message: error.response.data.message, type: 'error' }));
                });
        } else {
            api.post(`podcasts/like/${id}`)
                .then(response => {
                    console.log(response);
                    setLikesState(prevState => ({
                        ...prevState,
                        [id]: true
                    }));
                })
                .catch(error => {
                    console.error(error);
                    // dispatch(setAlert({ message: error.response.data.message, type: 'error' }));
                });
        }
    }

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',

        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            '&:focus': {
                width: '100%',
            },
        },
    }));

    const Search = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',

        backgroundColor: alpha(theme.palette.common.white, 0.15),
        borderRadius: theme.shape.borderRadius,
        maxWidth: 400,
        margin: '20px auto',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));


    const handleOpenVideo = (podcastId) => {
        console.log(podcastId)
        setPodcastId(podcastId);
        setVideoShow(true);
    }
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    return (
        <>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search podcasts..."
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleSearch}
                />
            </Search>
            <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, m: 4 }}>
                {(searchText.length > 0 ? filteredPodcasts : podcasts).map((item, index) => (
                    <Paper key={index} elevation={3} sx={{ width: 450 }}>
                        <Card raised sx={{ margin: 2 }}>
                            <IconButton onClick={() => handleLikeClick(item.id)}>
                                    {likesState[item.id] ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                            </IconButton>


                            <CardMedia
                                onClick={() => handleOpenVideo(item.id)}
                                component="video"
                                sx={{ height: 160 }}
                                image={item.path_file}
                                alt="Cannot display video or audio file"
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {item.name}
                                </Typography>

                            </CardContent>
                            <CardActions>
                                <Button>
                                    Open details
                                </Button>
                            </CardActions>
                        </Card>
                    </Paper>
                ))}
            </Box>
            {isOpen && (
                <Alert severity={type} sx={{ width: '200px', position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>{message} </Alert>
            )}
            {videoShow ? <VideoDialog videoShow={videoShow} setVideoShow={setVideoShow} podcasts={podcasts} podcastId={podcastId} /> : console.log('c')}

        </>
    );
}
