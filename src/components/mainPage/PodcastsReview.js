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
import { Badge } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VideoDialog from './VideoDetailsDialog';
export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
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
  
  const handleOpenVideo = (path) => {
    console.log(path)
    setVideoShow(true);
  }
  return (
    <>
        <Card sx={{ display: 'flex'}}>

            {podcasts.map((item) => (
                <Box key={item.id}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', m: 3 }}>
                        <CardMedia
                            onClick={() => handleOpenVideo(item.path_file)}
                            component="video"
                            sx={{ width: 200, alignSelf: 'center', cursor: 'pointer' }}
                            src={item.path_file}
                            alt="Cannot display video or audio file"
                        />
                        <IconButton onClick={() => handleLikeClick(item.id)}>
                            <Badge badgeContent={likeCount[item.id] || 0}>
                                <FavoriteBorderIcon />
                            </Badge>
                        </IconButton>



                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                {item.name}
                            </Typography>
                            <Typography>Format: {item.format}<HeadphonesIcon /></Typography>
                            <Typography>Category: {item.category}</Typography>

                            <Stack direction={'row'} spacing={2}>
                                <Avatar alt='User' src={item.avatar} />
                                <Typography>{user.name}</Typography>
                                <Typography>Views</Typography>
                            </Stack>

                        </CardContent>

                    </Box>

                </Box>
            ))}
        </Card>
       {/* {videoShow ? <SimpleDialogDemo/>: 
       <div>Error</div>
       } */}
       {videoShow ? <VideoDialog videoShow={videoShow} setVideoShow={setVideoShow} podcasts={podcasts}/>:
       <div>error</div>
       }

    </>




);
}
