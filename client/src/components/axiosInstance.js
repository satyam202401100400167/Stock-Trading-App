import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://stock-trading-app-2n0h.onrender.com/api',
});

// Automatically add token to headers
axiosInstance.interceptors.request.use((config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        const { token } = JSON.parse(userInfo);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
