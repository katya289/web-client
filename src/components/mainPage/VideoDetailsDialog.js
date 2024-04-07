
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import VideoPlayer from '../podcasts/VideoPlayer';
import DialogContent from '@mui/material/DialogContent';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DialogContentText from '@mui/material/DialogContentText';
import { useEffect, useState } from 'react';
export default function VideoDialog({ videoShow, setVideoShow, podcasts, podcastId }) {
  

  useEffect(() => {
    console.log(podcasts)
  })

  const handleCloseClick = () => {
    setVideoShow(false)
  }
  return (
    <Dialog open={videoShow} fullWidth maxWidth="lg">
      <DialogContent sx={{ backgroundColor: 'black', width: '100%', height: '100%', position: 'relative' }}>
        <ClearIcon onClick={() => handleCloseClick()} style={{ cursor: 'pointer', color: 'white', position: 'absolute', top: 0, right: 0, margin: '14px' }} />
      
        <VideoPlayer podcastId={podcastId}  style={{ width: '100%', height: '100%' }} />
        <DialogContentText color='white'>
          {podcasts.map((podcast, index) => (
            <Box key={index}>

              <Typography>{podcast.description}</Typography>

            </Box>
          ))}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}