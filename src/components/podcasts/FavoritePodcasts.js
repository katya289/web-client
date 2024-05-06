import { useEffect, useState } from "react";
import api from "../../api";
import { Box, Card, CardContent, CardMedia, Typography, Paper, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import VideoDialog from "../mainPage/VideoDetailsDialog";
import AudioPlayer from "./MediaPlayer";
import MediaPlayer from "./MediaPlayer";
export default function FavoritePodcasts() {
  const [likedPodcasts, setLikedPodcasts] = useState([]);
  const [videoShow, setVideoShow] = useState(false);
  const [podcastId, setPodcastId] = useState("");
  const [mediaShow, setMediaShow] = useState(false);
  const [currentMedia, setCurrentMedia] = useState("");
  const [currentPreview, setCurrentPreview] = useState("");
  
  const fetchFavPodcasts = async () => {
    try {
      const response = await api.get('/podcasts/likes');
      if (response.data.likedPodcasts) {
        const likedPodcastsArray = Object.keys(response.data.likedPodcasts).map(category => ({
          category,
          podcasts: response.data.likedPodcasts[category]
        }));
        console.log(likedPodcastsArray)
        setLikedPodcasts(likedPodcastsArray);
      } else {
        setLikedPodcasts([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCloseDialog = () => {
    setMediaShow(false)
  }

  useEffect(() => {
    fetchFavPodcasts();
  }, []);


  const handleDeleteFav = async (id) => {
    try {
      await api.delete(`/podcasts/like-delete/${id}`);
      await fetchFavPodcasts();
    } catch (error) {
      console.log(error);
    }
  }
  const handleOpenMedia = (podcastId, mediaSrc, preview) => {
    console.log(podcastId);
    console.log(mediaSrc);
    setCurrentMedia(mediaSrc);
    setCurrentPreview(preview);
    setMediaShow(true);

  }


  return (
    <Box m={3}>
      {likedPodcasts.map((categoryObj) => (
        <Box key={categoryObj.category}>
          <Typography color={'white'} variant="overline" fontSize={'12px'}>{categoryObj.category}</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, m: 3 }}>
            {categoryObj.podcasts && categoryObj.podcasts.map((item) => (
              <Paper key={item.id} elevation={4} sx={{
                position: 'relative',
                backgroundColor: '#222831',
                width: 300,
                height: 400,
                padding: 2,
                borderRadius: 3,
                "&:hover": {
                  boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.3)',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)'
                },
                transition: 'box-shadow 0.3s ease'
              }}>
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 1,
                    color: 'white',
                    marginRight: -1,
                    marginTop: -1
                  }}
                  onClick={() => handleDeleteFav(item.id)}
                >
                  <CloseIcon />
                </IconButton>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <CardContent sx={{ bgcolor: '#31363F', flex: '1 0 auto', color: 'white', alignContent: 'center' }}>
                    <Typography variant="subtitle1">
                      {item.name}
                    </Typography>
                  </CardContent>
                 <CardMedia
                    onClick={() => handleOpenMedia(item.id, item.path_file, item.preview)}
                    component="img"
                    src={item.preview}
                  >
                  </CardMedia>

                </Card>
              </Paper>
            ))}
          </Box>
        </Box>
      ))}
      {/* {videoShow ? <VideoDialog videoShow={videoShow} setVideoShow={setVideoShow} podcasts={likedPodcasts} podcastId={podcastId} /> : null} */}
      {mediaShow ? <MediaPlayer mediaSrc={currentMedia} preview={currentPreview} mediaShow={mediaShow} onClose={handleCloseDialog} /> : null}

    </Box>
  );
}
