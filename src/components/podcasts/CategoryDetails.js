import React, { useEffect, useState } from "react";
import api from "../../api";
import { useLocation } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography, Paper, IconButton, InputBase, CardActions, Button } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VideoDialog from "../mainPage/VideoDetailsDialog";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from "react-redux";
import Alert from '@mui/material/Alert';

import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import PodcastsDialog from "./PodcastsDialog";

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
    const [open, setIsOpen] = useState(false);
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

    useEffect(() => {
        const storedLikesState = localStorage.getItem('likesState');
        if (storedLikesState) {
            setLikesState(JSON.parse(storedLikesState));
        }
    }, []);

    const initializeLikesState = (podcasts) => {
        const initialLikesState = {};
        podcasts.forEach(podcast => {
            const storedLike = JSON.parse(localStorage.getItem(`like_${podcast.id}`));
            initialLikesState[podcast.id] = storedLike !== null ? storedLike : false;
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


    const handleDetailsClick = async (id) => {
        console.log(id);
        setIsOpen(true)


    }
    const onClose = () => {
        setIsOpen(false)
    }

    const handleLikeClick = async (id) => {
        try {
            if (likesState[id]) {
                await api.delete(`podcasts/like-delete/${id}`);
                setLikesState(prevState => ({
                    ...prevState,
                    [id]: false
                }));
                localStorage.setItem(`like_${id}`, false);
            } else {
                await api.post(`podcasts/like/${id}`);
                setLikesState(prevState => ({
                    ...prevState,
                    [id]: true
                }));
                localStorage.setItem(`like_${id}`, true);
            }
        } catch (error) {
            console.error('Error handling like click:', error);
        }
    };

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
        <Box m={3}>
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
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, m: 4 }}>
                {(searchText.length > 0 ? filteredPodcasts : podcasts).map((item, index) => (
                    <Paper key={index} elevation={3} sx={{
                        backgroundColor: '#222831', width: 250, padding: 2, borderRadius: 3,
                        "&:hover": {
                            boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.3)',
                            backgroundColor: 'rgba(0, 0, 0, 0.1)'
                        },
                        position: 'relative',
                        transition: 'box-shadow 0.3s ease'
                    }}>
                        <IconButton
                            onClick={() => handleLikeClick(item.id)}
                            sx={{ position: 'absolute', top: -12, right: -12, zIndex: 1, margin: 3 }} // Positioned the like button outside the card
                        >
                            {likesState[item.id] ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <CardContent sx={{ bgcolor: '#31363F', flex: '1 0 auto', color: 'white', alignContent: 'center' }}>
                                <Typography variant="subtitle1" component="div">
                                    {item.name}
                                </Typography>

                            </CardContent>

                            <CardMedia
                                onClick={() => handleOpenVideo(item.id)}
                                component="video"
                                sx={{ height: 160, bgcolor: '#31363F' }}
                                image={item.path_file}
                                alt="Cannot display video or audio file"
                            />

                            <CardActions sx={{ alignSelf: 'center' }}>
                                <Button color="secondary" size="small" onClick={() => handleDetailsClick(item.id)}>
                                    Open details
                                    <IconButton color="secondary" size="small">
                                        <DisplaySettingsIcon />

                                    </IconButton>
                                </Button>
                            </CardActions>
                        </Card>
                    </Paper>
                ))}
            </Box>
            {isOpen && (
                <Alert severity={type} sx={{ width: '200px', position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>{message} </Alert>
            )}
            {videoShow && <VideoDialog videoShow={videoShow} setVideoShow={setVideoShow} podcasts={podcasts} podcastId={podcastId} />}
            <PodcastsDialog open={open} onClose={onClose} podcastId={podcastId}></PodcastsDialog>
        </Box>
    );
}
