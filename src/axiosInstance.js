import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://react-my-burger-7e4d0.firebaseio.com/'
});

export default axiosInstance;