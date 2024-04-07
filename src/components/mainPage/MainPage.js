import { useEffect, useState } from "react"
import axios from "axios";

import PrimarySearchAppBar from "../appBar/primarySearchAppBar";
import Podcasts from "./PodcastsReview";
import Audio from "../podcasts/Audio";


export default function MainPage() {



    return (
        <>
            {/* <Audio></Audio> */}

            <PrimarySearchAppBar />

            <Podcasts />



        </>
    );
}
