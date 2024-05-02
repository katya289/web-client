import React, { useState, useRef } from 'react';
import { IconButton, Slider, Grid, Typography, Dialog, CardMedia, Paper, Box } from '@mui/material';
import { PlayArrow, Pause, VolumeUp, Close } from '@mui/icons-material';

const AudioPlayer = ({ audioSrc, audioShow, preview, onClose }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    
    const handlePlayPause = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        audioRef.current.volume = newValue / 100;
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <Dialog open={audioShow} onClose={onClose} fullWidth maxWidth={false}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '70vh' }}>
                <CardMedia component="img" src={preview} alt="Preview" sx={{ width: '100%', mb: 2 }} />
                <Paper elevation={0} sx={{ padding: '20px', backgroundColor: '#000', width: '100%', flexGrow: 1 }}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} sx={{ textAlign: 'right' }}>
                            <IconButton onClick={onClose} sx={{ color: '#fff' }}>
                                <Close />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item>
                                    <IconButton onClick={handlePlayPause} sx={{ color: '#fff' }}>
                                        {isPlaying ? <Pause /> : <PlayArrow />}
                                    </IconButton>
                                </Grid>
                                <Grid item xs>
                                    <audio
                                        ref={audioRef}
                                        src={audioSrc}
                                        onTimeUpdate={handleTimeUpdate}
                                    />
                                    <Slider
                                        value={currentTime}
                                        max={duration}
                                        onChange={(event, newValue) => audioRef.current.currentTime = newValue}
                                        aria-labelledby="continuous-slider"
                                        sx={{ color: '#fff' }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography sx={{ color: '#fff' }}>{formatTime(currentTime)}</Typography>
                                </Grid>
                                <Grid item>
                                    <VolumeUp sx={{ color: '#fff' }} />
                                </Grid>
                                <Grid item xs>
                                    <Slider
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        aria-labelledby="continuous-slider"
                                        min={0}
                                        max={100}
                                        orientation="vertical"
                                        style={{ height: 100 }}
                                        sx={{ color: '#fff' }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Dialog>
    );
};

export default AudioPlayer;
