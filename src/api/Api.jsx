import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers:{
        "Content-Type":"multipart/form-data"
    } 
})

//configuration for axios 
const config = {
    headers :{
        'authorization' : `Bearer ${localStorage.getItem('token')}`
    }
}

export const testApi = () => Api.get("/");

//creating register api
export const registerApi = (data) => Api.post("/api/register", data); 

// Create login api
export const loginApi = (data) => Api.post("/api/login", data);
