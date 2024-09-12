import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3002',
    headers: {
        'Content-Type': 'application/json',
    },
});

type Data = {
    username: string
    email: string
    password: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const submitData = async (data: Data) => {
    try {
        const response = await axios.post('http://localhost:3002/register', data);
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;