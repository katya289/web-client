import { useEffect, useState } from "react"
import axios from "axios";

export default function MainPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users');
            console.log(response.data)
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <h1>Users</h1>
            <p>{users}</p>
        </>
    );
}
