import { useEffect, useState } from "react";
import api from "../../api";
import { useLocation } from 'react-router-dom'; // Импорт useLocation

export default function CategoryDetails() {
    const location = useLocation(); // Получение состояния маршрута

    const [podcasts, setPodcasts] = useState([]); // Состояние для хранения данных о подкастах

    useEffect(() => {
        const category = location.state.category;

        // Запрос данных о подкастах для выбранной категории
        const fetchPodcasts = async () => {
            try {
                const response = await api.get(`/by-category/${category}`);
                console.log(response.data); // Вывод данных о подкастах в консоль
                setPodcasts(response.data); // Установка данных о подкастах в состояние
            } catch (error) {
                console.error('Error fetching podcasts:', error);
            }
        };

        fetchPodcasts(); // Вызов функции запроса данных о подкастах
    }, [location.state.category]); // Зависимость от category, чтобы эффект сработал при изменении категории

    return (
        <>
           лщлщщ
        </>
    );
}
