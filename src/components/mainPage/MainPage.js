import { useEffect, useState } from "react"
import axios from "axios";
import PrimarySearchAppBar from "../appBar/primarySearchAppBar";
import Podcasts from "./PodcastsReview";

export default function MainPage({isOpen, message}) {



    return (
        <>

            <PrimarySearchAppBar />
            <Podcasts />
    
        </>
    );
}
