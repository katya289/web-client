import { useEffect, useState } from "react"
import axios from "axios";
import PrimarySearchAppBar from "../appBar/primarySearchAppBar";
import Podcasts from "./PodcastsReview";
import TemporaryDrawer from "../appBar/NavBar";
import UploadPodcast from "../podcasts/UploadPodcast";

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
import Grid from '@mui/material/Grid';
export default function MainPage() {



    return (
        <>



            <PrimarySearchAppBar />
            <Podcasts />






        </>




    );
}
