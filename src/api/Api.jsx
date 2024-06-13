import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5000", 
    withCredentials: true,            
    headers: {
        "Content-Type": "application/json"
    }
});

// Forgot Password API
export const forgotPasswordApi = (data) => Api.post("/users/forgetPassword", data);

// Reset Password API
export const resetPasswordApi = (token, newPassword) => {
    return Api.post(`/users/reset-password/${token}`, { newPassword });
};

// Register API
export const registerApi = (data) => {
    return Api.post("/users/register", data);
};

// Login API
export const loginApi = (data) => {
    return Api.post("/users/login", data);
};

// Example GET request
export const testApi = () => {
    return Api.get("/");
};

export default Api;
