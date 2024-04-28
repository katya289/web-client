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
    <div>
      {likedPodcasts.map((categoryObj) => (
        <div key={categoryObj.category}>
          <h2>{categoryObj.category}</h2>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, m: 3 }}>
            {categoryObj.podcasts && categoryObj.podcasts.map((item) => (
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

                    <Typography>Format: {item.format}</Typography>
                  </CardContent>
                </Card>
              </Paper>
            ))}
          </Box>
        </div>
      ))}

      {videoShow ? <VideoDialog videoShow={videoShow} setVideoShow={setVideoShow} podcasts={likedPodcasts} podcastId={podcastId} /> : console.log('c')}

    </div>

  );
}
