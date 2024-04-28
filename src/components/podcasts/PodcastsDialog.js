
import { Box, Dialog } from "@mui/material";

import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

import { useEffect, useState } from "react";
import api from "../../api";




export default function PodcastsDialog({ podcastId, open, onClose }) {
    const [fetchedPodcast, setFetchedPodcast] = useState({});
    const handleClose = () => {
        onClose();
    };
    const fetchPodcastById = async () => {
        try {
            const response = await api.get(`/podcasts/${podcastId}get`);
             console.log(response.data); // Check the structure of the response
             if (response.data.podcast.length > 0) {
                setFetchedPodcast(response.data.podcast[0]); // Access the first object in the array
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchPodcastById()
    }, [podcastId])
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle bgcolor={'#31363F'}>Podcast Details</DialogTitle>
            <List sx={{ pt: 0, bgcolor: '#31363F' }}>
                <ListItem disableGutters>
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={fetchedPodcast.name} 
                            secondary={fetchedPodcast.description} 
                        />
                     
                    </ListItemButton>
                </ListItem>
                <ListItem disableGutters>
                    <ListItemButton autoFocus>
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Add account" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
            )
}