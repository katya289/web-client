import { useEffect, useState } from "react"
import api from "../../api";



export default function FavoritePodcasts() {
    const [likedPodcasts, setLikedPodcasts] = useState([]);



    useEffect(() => {
        try {
            const response = api.get('/podcasts/likes');
            console.log(response);
        }
        catch (error) {
            console.log(error)
        }
      
    })

    return (
        <>

        </>
    )
}