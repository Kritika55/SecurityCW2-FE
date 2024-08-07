// axiosConfig.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
        Accept: 'application/json',
    }
});

const config = {
    headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
};

export {api, config};
