import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Link } from '@mui/material';

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const theme = useTheme();
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzExODczOTMxLCJleHAiOjE3MTE5NjAzMzF9.U1WLLo1502PPsnop6GOPFhTM9D4rBNTOaQ6rTKx8Ndo';
  useEffect(() => {

    axios.get('http://127.0.0.1:4000/api/podcasts/get', {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setPodcasts(response.data.podcast);
        console.log("Succes", response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>

      <Card sx={{ display: 'flex', width: 'calc(100% - 250px)', marginLeft: 30, bgcolor: '#76ABAE'}}>

        {podcasts.map((item) => (
          <Box key={item.id}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  {item.name}
                </Typography>
                

              </CardContent>

              <CardMedia
                component="video"
                sx={{ width: 151, alignSelf: 'center' }}
                src={item.path_file}
                alt="Live from space album cover"
              />


            </Box>

          </Box>
        ))}
      </Card>
    </>

  );
}
