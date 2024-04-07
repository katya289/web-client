import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Avatar from '@mui/material/Avatar';
import api from '../../api';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Badge } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VideoDialog from './VideoDetailsDialog';

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [podcastId, setPodcastId] = useState("");
  const [user, setUser] = useState({});
  const [likeCount, setLikeCount] = useState({});
  const [videoShow, setVideoShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const podcastsResponse = await api.get('podcasts/get');
        setPodcasts(podcastsResponse.data.podcast);
        console.log("Podcasts fetched successfully:", podcastsResponse.data);

        const userResponse = await api.get('users/get');
        setUser(userResponse.data.user);
        console.log("User fetched successfully:", userResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLikeClick = (id) => {
    setLikeCount((prevLikes) => ({
      ...prevLikes,
      [id]: (prevLikes[id] || 0) + 1,
    }));
    console.log(`Podcast ${id} has ${likeCount[id] !== undefined ? likeCount[id] + 1 : 1} likes`);
  };

  const handleOpenVideo = (podcastId) => {
    console.log(podcastId)
    setPodcastId(podcastId);
    setVideoShow(true);
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, m: 3 }}>
        {podcasts.map((item) => (
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
                <IconButton onClick={() => handleLikeClick(item.id)}>
                  <Badge badgeContent={likeCount[item.id] || 0} sx={{ color: 'white' }}>
                    <FavoriteBorderIcon sx={{ color: 'white' }} />
                  </Badge>
                </IconButton>
                <Typography component="div" variant="h5">
                  {item.name}
                </Typography>
                <Typography>Format: {item.format}<HeadphonesIcon /></Typography>
                <Typography>Category: {item.category}</Typography>
                <Stack direction={'row'} spacing={2} alignItems="center">
                  <Avatar alt='User' src={item.avatar} sx={{width: '30px', height: '30px'}} />
                  <Typography>{user.name}</Typography>
                  <Typography>Views</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Paper>
        ))}
      </Box>
      {videoShow ? <VideoDialog videoShow={videoShow} setVideoShow={setVideoShow} podcasts={podcasts} podcastId={podcastId} /> : <div>error</div>}
    </>
  );
}