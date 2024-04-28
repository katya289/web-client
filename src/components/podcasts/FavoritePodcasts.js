import { useEffect, useState } from "react"
import api from "../../api";
import { BASE_URL } from "../constants";
import { Box, Card, CardContent, CardMedia, Typography, Paper, IconButton, InputBase, CardActions, Button } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import VideoDialog from "../mainPage/VideoDetailsDialog";
export default function FavoritePodcasts() {
  const [likedPodcasts, setLikedPodcasts] = useState([]);
  const [videoShow, setVideoShow] = useState(false);
  const [podcastId, setPodcastId] = useState("");

  const fetchFavPodcasts = async () => {
    try {
      const response = await api.get('/podcasts/likes');
      const likedPodcastsArray = Object.keys(response.data.likedPodcasts).map(category => ({
        category,
        podcasts: response.data.likedPodcasts[category]
      }));
      console.log(likedPodcastsArray)
      setLikedPodcasts(likedPodcastsArray);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchFavPodcasts();
  }, []);

  const handleOpenVideo = (podcastId) => {
    console.log(podcastId);
    setPodcastId(podcastId);
    setVideoShow(true);
  }

  return (
    <Box m={3}>
      {likedPodcasts.map((categoryObj) => (
        <Box key={categoryObj.category}>
          <Typography color={'white'} variant="overline" fontSize={'12px'}>{categoryObj.category}</Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, m: 3 }}>

            {categoryObj.podcasts && categoryObj.podcasts.map((item) => (
              <Paper key={item.id} elevation={4}
                sx={{
                  backgroundColor: '#222831', width: 250, padding: 2, borderRadius: 3,
                  "&:hover": {
                    boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.3)',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)'
                  },
                  transition: 'box-shadow 0.3s ease'
                }}>

                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <CardContent sx={{ bgcolor: '#31363F', flex: '1 0 auto', color: 'white', alignContent: 'center' }}>
                    <Typography variant="subtitle1">
                      {item.name}
                    </Typography>

                  </CardContent>
                  <CardMedia
                    onClick={() => handleOpenVideo(item.id)}
                    component="video"
                    sx={{ width: '100%', cursor: 'pointer' }}
                    src={item.path_file}
                    alt="Cannot display video or audio file"
                  />

                </Card>
              </Paper>
            ))}
          </Box>
        </Box>
      ))}

      {videoShow ? <VideoDialog videoShow={videoShow} setVideoShow={setVideoShow} podcasts={likedPodcasts} podcastId={podcastId} /> : console.log('c')}

    </Box>

  );
}
