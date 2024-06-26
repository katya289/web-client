import React, { useEffect, useState } from "react";
import api from "../../api";
import './DialogStyle.css'; // or import './DialogStyles.scss';
import AudioPlayer from "./MediaPlayer";
import { useLocation } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography, Paper, IconButton, InputBase, CardActions, Button, Divider } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VideoDialog from "../mainPage/VideoDetailsDialog";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from "react-redux";
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import Dialog from "@mui/material/Dialog";
import { BASE_URL } from "../constants";
import formatDate from "../formatDate";
import TextField from "@mui/material/TextField";
import DeleteIcon from '@mui/icons-material/Delete';

export default function CategoryDetails() {
    const { isOpen, message, type } = useSelector(state => state.alert);
    const dispatch = useDispatch();
    const location = useLocation();
    const [podcasts, setPodcasts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredPodcasts, setFilteredPodcasts] = useState([]);
    const [likesState, setLikesState] = useState({});
    const [open, setIsOpen] = useState(false);
    const [currentPodcast, setCurrentPodcast] = useState(null);
    const [currentPodcastId, setCurrentPodcastId] = useState(null);
    const [mediaShow, setMediaShow] = useState(false);
    const [currentMedia, setCurrentMedia] = useState("");
    const [currentPreview, setCurrentPreview] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [comments, setComments] = useState([]);

    const [currentUser, setCurrentUser] = useState(null);
    const [hoveredComment, setHoveredComment] = useState(null);
   

    
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

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await api.get('/users/get');
                console.log(response.data.user)
                setCurrentUser(response.data.user);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (currentPodcastId) {
            fetchComments(currentPodcastId);
        }
    }, [currentPodcastId]);

    const fetchUser = async (userId) => {
        try {
            const response = await api.get(`users/get/${userId}`);
            return response.data.user;
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    }

    const fetchComments = async (podcastId) => {
        try {
            const response = await api.get(`podcasts/comments/${podcastId}`);
            setComments(response.data.comments);
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleCommentSend = async (id) => {
        try {
            const response = await api.post(`podcasts/comment/add/${id}`, { commentText: inputValue });
            setInputValue("");
            fetchComments(id);
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleCloseDialog = () => {
        setMediaShow(false);
    }

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

    const handleDetailsClick = async (id, userId) => {
        const selectedPodcast = podcasts.find(podcast => podcast.id === id);
        const userResponse = await fetchUser(userId);
        const user = userResponse[0];
        setCurrentPodcastId(id);
        setCurrentPodcast({ ...selectedPodcast, user });
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false)
    }
    const handleDeleteComm = async (commId, currentPodcastId) => {
        console.log(currentPodcastId)
        try {
            const response = await api.delete(`/podcasts/comment/delete/${commId}`);
            console.log(response); // Проверьте, что возвращает API при успешном удалении

            fetchComments(currentPodcastId)
        }
        catch (error) {
            console.log(error)
        }
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
    const handleMouseEnter = (commentId) => {
        setHoveredComment(commentId);
    };

    const handleMouseLeave = () => {
        setHoveredComment(null);
    };
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

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

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const handleOpenMedia = (podcastId, mediaSrc, preview) => {
        setCurrentMedia(mediaSrc);
        setCurrentPreview(preview);
        setMediaShow(true);
    }

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
                        backgroundColor: '#222831', width: 300, padding: 2, borderRadius: 3,
                        "&:hover": {
                            boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.3)',
                            backgroundColor: 'rgba(0, 0, 0, 0.1)'
                        },
                        position: 'relative',
                        transition: 'box-shadow 0.3s ease'
                    }}>
                        <IconButton
                            onClick={() => handleLikeClick(item.id)}
                            sx={{ position: 'absolute', top: -12, right: -12, zIndex: 1, margin: 3 }}
                        >
                            {likesState[item.id] ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <CardContent sx={{ bgcolor: '#31363F', flex: '1 0 auto', color: 'white', alignContent: 'center' }}>
                                <Typography variant="subtitle1" component="div" sx={{ color: 'white', fontWeight: 'bold' }}>
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" component="div" sx={{ color: 'lightgray', mt: 1 }}>
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <CardMedia
                                onClick={() => handleOpenMedia(item.id, item.path_file, item.preview)}
                                component="img"
                                src={item.preview}
                                sx={{ cursor: 'pointer' }}
                            />
                            <CardActions sx={{ alignSelf: 'center' }}>
                                <Button color="secondary" size="small" onClick={() => handleDetailsClick(item.id, item.userId)}>
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
                <Alert severity={type} sx={{ width: '200px', position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>{message}</Alert>
            )}
            {mediaShow && <AudioPlayer mediaSrc={currentMedia} preview={currentPreview} mediaShow={mediaShow} onClose={handleCloseDialog} />}

            <Dialog onClose={handleClose} open={open} PaperProps={{ sx: { overflow: 'hidden', width: '600px' } }} fullWidth>
                <DialogTitle sx={{ textAlign: 'center' }}>Podcast Details</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {currentPodcast && (
                        <ListItem disableGutters>
                            <ListItemButton>
                                <ListItemText
                                    primary={currentPodcast.name || ''}
                                    secondary={currentPodcast.description || ''}
                                    primaryTypographyProps={{ fontWeight: 'bold' }}
                                />
                            </ListItemButton>
                        </ListItem>
                    )}
                    <Divider variant="middle" />
                    <ListItem disableGutters sx={{ m: 2 }}>
                        <ListItemAvatar>
                            <Avatar src={currentPodcast?.user?.avatar ? `${BASE_URL}avatars/${currentPodcast.user.avatar}` : null}>
                                {!currentPodcast?.user?.avatar && <PersonIcon />}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={currentPodcast?.user?.name || 'Anonymous'}
                            primaryTypographyProps={{ color: 'primary.main' }}
                        />
                    </ListItem>
                    <ListItem disableGutters sx={{ m: 2 }}>
                        <Typography variant="subtitle1" sx={{ mr: 1 }}>Uploaded at:</Typography>
                        <ListItemText
                            secondary={currentPodcast?.createdAt ? formatDate(currentPodcast.createdAt) : ''}
                        />
                    </ListItem>
                </List>
                <List sx={{ pt: 0 }}>
                    <Divider variant="middle" />
                    <ListItem disableGutters sx={{ m: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '90%' }}>
                            {comments.map(item => (
                                <ListItem
                                    key={item.id}
                                    disableGutters
                                    sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}
                                    onMouseEnter={() => handleMouseEnter(item.id)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar src={`${BASE_URL}avatars/${item.user.avatar}`} />
                                        <Box sx={{ ml: 2 }}>
                                            <Typography variant="subtitle1">{item.user.name}</Typography>
                                            <ListItemText primary={item.commentText} />
                                        </Box>
                                    </Box>
                                    {currentUser && currentUser.id === item.userId && (
                                        <IconButton
                                            color={hoveredComment === item.id ? 'error' : 'default'}  // Используем красный цвет при наведении на комментарий

                                            onClick={() => handleDeleteComm(item.id, currentPodcastId)}
                                            // color="default"
                                            size="small"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </ListItem>
                            ))}
                        </Box>
                    </ListItem>
                    <ListItem disableGutters sx={{ m: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <TextField
                                placeholder="Write a comment..."
                                value={inputValue}
                                onChange={handleChange}
                                multiline
                                rows={3}
                                sx={{ width: '95%' }}
                            />
                            <Button onClick={() => handleCommentSend(currentPodcast.id)} sx={{ mt: 1, alignSelf: 'center' }}>Send</Button>
                        </Box>
                    </ListItem>
                </List>
            </Dialog >

        </Box >
    );
}
