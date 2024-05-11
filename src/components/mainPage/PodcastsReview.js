import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import formatDate from '../formatDate';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeProvider';
import AudioPlayer from '../podcasts/MediaPlayer';
import { BASE_URL } from '../constants';
import { Box, Stack } from '@mui/material';
import { Headphones, VideoLibrary } from '@mui/icons-material';
import api from '../../api';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
export default function Podcasts() {
  const theme = useTheme();
  console.log(theme);
  const [podcasts, setPodcasts] = useState([]);
  const [user, setUser] = useState({});
  const [mediaShow, setMediaShow] = useState(false);
  const [currentMedia, setCurrentMedia] = useState("");
  const [currentPreview, setCurrentPreview] = useState("");
  const [format, setFormat] = useState("");
  const navigate = useNavigate();
  const formats = {
    'Audio': <Headphones />,
    'Video': <VideoLibrary />
  }

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

  const handleClose = () => {
    setMediaShow(false);
  }

  const handleOpenMedia = (podcastId, mediaSrc, preview, format) => {
    console.log(podcastId);
    console.log(mediaSrc);
    setCurrentMedia(mediaSrc);
    setCurrentPreview(preview);
    setMediaShow(true);
    setFormat(format);
  }

  return (
    <>
      {podcasts.map((item) => (
        <Card key={item.id} sx={{ display: 'flex', m: 4, borderRadius: 10, overflow: 'hidden', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '800px' }}>
          <CardMedia
            component="img"
            sx={{ width: '300px', height: '300px' }}
            src={item.preview}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {item.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Format: {formats[item.format]}
              </Typography>
            </CardContent>
            <Stack direction={'row'} spacing={2} alignItems="center">
              <Avatar alt='User' src={`${BASE_URL}avatars/${user.avatar}`} sx={{ width: '30px', height: '30px' }} />
              <Typography variant="body2" color="text.secondary">
                Author: {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Uploaded at: {formatDate(user.createdAt)}
              </Typography>
           
              <IconButton onClick={() => handleOpenMedia(item.id, item.path_file, item.preview, item.format)} aria-label="play/pause">
                <PlayArrowIcon   sx={{ height: 38, width: 38}} />
              </IconButton>
            </Stack>
          </Box>
        </Card>
      ))}
      {mediaShow ? <AudioPlayer mediaSrc={currentMedia} preview={currentPreview} mediaShow={mediaShow} onClose={handleClose} format={format} /> : null}
    </>
  );
}
