import { useEffect, useState } from "react"
import axios from "axios";
import PrimarySearchAppBar from "../appBar/primarySearchAppBar";
import Podcasts from "./PodcastsReview";
import TemporaryDrawer from "../appBar/NavBar";
import UploadPodcast from "../podcasts/UploadPodcast";


export default function MainPage() {


    return (
        <>
            <PrimarySearchAppBar />
            <TemporaryDrawer />
            <UploadPodcast />
            <Podcasts />
        </>




    );
}
