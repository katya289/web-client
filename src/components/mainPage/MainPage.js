import { useEffect, useState } from "react"
import axios from "axios";
import { Grid } from '@mui/material';
import PrimarySearchAppBar from "../appBar/primarySearchAppBar";
import Podcasts from "./PodcastsReview";
import Audio from "../podcasts/Audio";
import MainLayout from "../wrapper/MainLayout";
import TemporaryDrawer from "../appBar/NavBar";
export default function MainPage() {


    return (
        
           <Grid container>
            {/* <Grid item xs={12}> */}
                {/* <PrimarySearchAppBar /> */}
            {/* </Grid> */}
            
            <Grid item xs={10}>
                <Podcasts />
            </Grid>
        </Grid>
       



    )
}
