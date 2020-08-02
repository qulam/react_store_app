import axios from 'axios';

const axiosInstance = axios.create({
    /***
     * Refresh Store Service (for run this service, run this command on CLI in project root => `node serivces/microservice.js` )
     * */
    baseURL: `http://127.0.0.1:3002/`,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;
