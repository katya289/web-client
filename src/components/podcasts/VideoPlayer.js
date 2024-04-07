import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import Container from '@mui/material/Container';
import ControlIcons from './ControlIcons';
import "./VideoPlayer.css";
import api from '../../api';
import { useState, useRef, useEffect } from 'react';
const format = (seconds) => {
    if (isNaN(seconds)) {
        return '00:00'
    }

    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");

    if (hh) {
        return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`
    } else {
        return `${mm}:${ss}`
    }
};
export default function VideoPlayer({ podcastId }) {
    const [currentPodcast, setCurrentPodcast] = useState({});
    const playerDivRef = useRef(null);
    const playerRef = useRef(null);
    const currentPlayerTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
    const movieDuration = playerRef.current ? playerRef.current.getDuration() : '00:00';
    const playedTime = format(currentPlayerTime);
    const fullMovieTime = format(movieDuration);
    const [playerstate, setPlayerState] = useState({
        playing: true,
        mute: true,
        volume: 0.5,
        playerbackRate: 1.0,
        played: 0,
        seeking: false,
    })

    useEffect(() => {
        console.log(podcastId)
        const fetchPodcastById = async () => {
            const response = await api.get(`podcasts/${podcastId}/get`);
            console.log(response.data.podcast);
            setCurrentPodcast(response.data.podcast);
        }
        fetchPodcastById();
    }, [])
    const { playing, mute, volume, playerbackRate, played, seeking } = playerstate;
    const handlePlayerRate = (rate) => {
        setPlayerState({ ...playerstate, playerbackRate: rate });
    }
    const handlePlayAndPause = () => {
        setPlayerState({
            ...playerstate,
            playing: !playerstate.playing
        })
    }
    const handleMuting = () => {
        setPlayerState({ ...playerstate, muted: !playerstate.muted })
    }
    const handleRewind = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10, 'seconds')
    }
    const handleFastForward = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 30, 'seconds')
    }
    const handlePlayerProgress = (state) => {
        // console.log('onProgress', state);
        if (!playerstate.seeking) {
            setPlayerState({ ...playerstate, ...state })
        }
        // console.log('afterProgress', state);
    }
    const handlePlayerSeek = (newValue) => {
        setPlayerState({ ...playerstate, played: parseFloat(newValue / 100) });
        playerRef.current.seekTo(parseFloat(newValue / 100));
    }

    const handlePlayerMouseSeekUp = (newValue) => {
        setPlayerState({ ...playerstate, seeking: false });
        playerRef.current.seekTo(newValue / 100);
    }
    const handleFullScreenMode = () => {
        screenfull.toggle(playerDivRef.current);
    }
    //function for the `onChange` event
    const handleVolumeChange = (e, newValue) => {
        setPlayerState({ ...playerstate, volume: parseFloat(newValue / 100), mute: newValue === 0 ? true : false, });
    }

    //function for the `onChangeCommitted` event
    const handleVolumeSeek = (e, newValue) => {
        setPlayerState({ ...playerstate, volume: parseFloat(newValue / 100), mute: newValue === 0 ? true : false, });
    }
    return (
        <>

            <Container maxWidth="md">
                <div className='playerDiv' ref={playerDivRef}>
                    <ReactPlayer width={'100%'} height='100%'
                        url={`${currentPodcast.path_file}`}
                        ref={playerRef}
                        playing={playing}
                        muted={mute}
                        onProgress={handlePlayerProgress}
                        playbackRate={playerbackRate}
                    />
                    <ControlIcons
                        playandpause={handlePlayAndPause}
                        playing={playing}
                        rewind={handleRewind}
                        fastForward={handleFastForward}
                        played={played}
                        onSeek={handlePlayerSeek}
                        onSeekMouseUp={handlePlayerMouseSeekUp}
                        playedTime={playedTime}
                        fullMovieTime={fullMovieTime}
                        muting={handleMuting}
                        muted={mute}
                        volume={volume}
                        volumeChange={handleVolumeChange}
                        volumeSeek={handleVolumeSeek}
                        playerbackRate={playerbackRate}
                        playRate={handlePlayerRate}
                        fullScreenMode={handleFullScreenMode}
                    />
                </div>
            </Container>
        </>
    )
}