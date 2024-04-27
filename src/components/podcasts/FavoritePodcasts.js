import { useEffect, useState } from "react"
import api from "../../api";
import { BASE_URL } from "../constants";
import { Box, Card, CardContent, CardMedia, Typography, Paper, IconButton, InputBase, CardActions, Button } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

export default function FavoritePodcasts() {
    const [likedPodcasts, setLikedPodcasts] = useState([]);
    const [videoShow, setVideoShow] = useState(false);
    const [podcastId, setPodcastId] = useState("");
    const fetchFavPodcasts = async () => {
        try {
            const response = await api.get('/podcasts/likes');
            console.log(response.data);
            setLikedPodcasts(response.data.likedPodcasts);
        }
        catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        fetchFavPodcasts()
    }, [])
    const handleOpenVideo = (podcastId) => {
        console.log(podcastId)
        setPodcastId(podcastId);
        setVideoShow(true);
    }

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, m: 3 }}>
        {likedPodcasts.map((item) => (
          <Paper key={item.id} elevation={4} sx={{ backgroundColor: '#222831', width: 250, padding: 2, borderRadius: 3, "&:hover": { boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.3)', backgroundColor: 'rgba(0, 0, 0, 0.1)' }, transition: 'box-shadow 0.3s ease' }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                onClick={() => handleOpenVideo(item.id)}
                component="video"
                sx={{ width: '100%', cursor: 'pointer' }}
                src={item.path_file}
                alt="Cannot display video or audio file"
              />

              <CardContent sx={{ bgcolor: '#31363F', flex: '1 0 auto', color: 'white' }}>
                
                <Typography component="div" variant="h5">
                  {item.name}
                </Typography>

                {/* {formats[item.format]}  */}
                <Typography>Format: {item.format}</Typography>
                {/* <Typography>Category: {item.category}</Typography> */}
               
              </CardContent>
            </Card>
          </Paper>
        ))}
      </Box>
      );
}