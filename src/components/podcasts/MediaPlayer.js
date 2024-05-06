import React, { useState, useRef } from 'react';
import { IconButton, Slider, Grid, Typography, Dialog, CardMedia, Paper, Box } from '@mui/material';
import { PlayArrow, Pause, VolumeUp, Close } from '@mui/icons-material';
import VolumeDown from '@mui/icons-material/VolumeDown';

const MediaPlayer = ({ mediaSrc, mediaShow, preview, onClose, format }) => {
    const mediaRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const handlePlayPause = () => {
        if (mediaRef.current.paused) {
            mediaRef.current.play();
            setIsPlaying(true);
        } else {
            mediaRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        mediaRef.current.volume = newValue / 100;
    };

    const handleTimeUpdate = () => {
        setCurrentTime(mediaRef.current.currentTime);
        setDuration(mediaRef.current.duration);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <Dialog 
            open={mediaShow} 
            onClose={onClose}
            fullWidth 
            maxWidth={false} 
            PaperProps={{
                style: {
                    overflow: 'hidden'
                }
            }}
            sx={{
                '& .MuiDialog-paper': {
                    width: '60vw', 
                    maxWidth: 'none' 
                }
            }}
        >
            <Paper sx={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                height: '75vh', 
                backgroundColor: '#222831', 
            }}>
                <IconButton onClick={onClose} sx={{ color: '#1E88E5', position: 'absolute', right: 16, top: 16 }}>
                    <Close />
                </IconButton>
                {format === 'Audio' ? (
                    <CardMedia
                        component="img"
                        src={preview}
                        alt="Preview"
                        sx={{
                            width: '100%',
                            height: '100%',
                            maxWidth: '800px',
                            maxHeight: '500px',
                            mb: 2,
                            display: 'block',
                            margin: 'auto',
                        }}
                    />
                ) : (
                    <CardMedia
                        component="video"
                        src={mediaSrc}
                        alt="Video cannot be shown"
                        ref={mediaRef}
                        onTimeUpdate={handleTimeUpdate}
                        onClick={handlePlayPause}
                        sx={{
                            width: '100%',
                            height: '100%',
                            maxWidth: '800px',
                            maxHeight: '500px',
                            mb: 2,
                            display: 'block',
                            margin: 'auto',
                        }} 
                    />
                )}
            </Paper>
            <Box sx={{
                position: 'fixed', 
                bottom: 60, 
                left: 0, 
                right: 0, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center'
            }}>
                <Grid item>
                    <IconButton onClick={handlePlayPause} sx={{ color: '#fff', mr: 1 }}>
                        {isPlaying ? <Pause sx={{ fontSize: '50px' }} /> : <PlayArrow sx={{ fontSize: '50px' }} />}
                    </IconButton>
                </Grid>
                {format === 'Audio' && (
                    <audio
                        ref={mediaRef}
                        src={mediaSrc}
                        onTimeUpdate={handleTimeUpdate}
                    />
                )}
                <Slider
                    value={currentTime}
                    max={duration}
                    onChange={(event, newValue) => mediaRef.current.currentTime = newValue}
                    aria-labelledby="continuous-slider"
                    sx={{ color: '#1E88E5', width: 1000 }}
                />
                <Grid item>
                    <Typography sx={{ color: '#fff', ml: 3, mr: 2 }}>{formatTime(currentTime)}</Typography>
                </Grid>

                <VolumeDown sx={{ color: '#fff', mr: 2 }} />
                <Slider
                    value={volume}
                    onChange={handleVolumeChange}
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={100}
                    sx={{ width: 100, color: '#1E88E5' }}
                />
                <VolumeUp sx={{ color: '#fff', ml: 2 }} />
            </Box>
        </Dialog>
    );
};

export default MediaPlayer;
