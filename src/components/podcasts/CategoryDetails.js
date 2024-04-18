import { useEffect, useState } from "react";
import api from "../../api";
import { useLocation } from 'react-router-dom'; // Импорт useLocation

export default function CategoryDetails() {
    const location = useLocation(); 

    const [podcasts, setPodcasts] = useState([]); 

    useEffect(() => {
        const category = location.state.category;
        const fetchPodcasts = async () => {
            try {
                const response = await api.get(`/by-category/${category}`);
                console.log(response.data); 
                setPodcasts(response.data); 
            } catch (error) {
                console.error('Error fetching podcasts:', error);
            }
        };

        fetchPodcasts(); 
    }, [location.state.category]); 
    return (
        <>
           лщлщщ
        </>
    );
}
