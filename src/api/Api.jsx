import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add a request interceptor to include the token in every request if it exists
Api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors globally
Api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle specific error status codes
        if (error.response && error.response.status === 401) {
            // Token expired or unauthorized
            localStorage.clear(); // Clear local storage if unauthorized
            window.location.href = "/login"; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

// Forgot Password API
export const forgotPasswordApi = (data) => Api.post("/api/users/forgetPassword", data);

// Reset Password API
export const resetPasswordApi = (token, newPassword) => {
    return Api.post(`/api/users/reset-password/${token}`, { newPassword });
};

// Register API
export const registerApi = (data) => {
    return Api.post("/api/users/register", data);
};

// Login API
export const loginApi = (data) => {
    return Api.post("/api/users/login", data);
};

// Profile API
export const profileApi = () => {
    return Api.get("/api/users/profile");
};

// Example GET request
export const testApi = () => {
    return Api.get("/api");
};

export default Api;
