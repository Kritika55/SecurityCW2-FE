import axios from "axios";

// creating an instance of axios
const Api = axios.create({
    baseURL : "http://localhost:5000",
    withCredentials : true,
    headers : {
        "Content-Type" : "multipart/form-data",
    }
});

// creating authorization config
const config = {
    headers : {
        'authorization' : `Bearer ${localStorage.getItem('token')}`
    }
}


// Creating test api
export const testApi = () => Api.get('/test')

// Creating register api
export const registerUserApi = (data) => Api.post('/api/user/create', data)

// Creating login api
export const loginUserApi = (data) => Api.post('/api/user/login', data)

// create product create api
export const createProductApi = (data) => Api.post('/api/product/create', data)

// Forgot Password API
export const forgotPasswordApi = (data) => Api.post("/api/users/forgetPassword", data);

// Reset Password API
export const resetPasswordApi = (token, newPassword) => {
    return Api.post(`/api/users/reset-password/${token}`, { newPassword });
};
// Profile API
export const profileApi = () => {
    return Api.get("/api/users/profile");
};

export const getUser = (userId) => Api.get(`/api/user/${userId}`, config);


// fetch all products
export const getAllProducts = () => Api.get('/api/product/get_all_products', config)

//fetch single product
export const getSingleProduct = (id) => Api.get(`/api/product/get_single_product/${id}`, config)

// delete product (Task)
export const deleteProduct = (id) => Api.delete(`/api/product/delete_product/${id}`)

// update product
export const updateProduct = (id, data) => Api.put(`/api/product/update_product/${id}`, data, config)

// http://localhost:5000/test


// Creating booking api
export const createBookingApi = (data) => Api.post('/api/bookings/create', data, config);

// Fetch all bookings
export const getAllBookingsApi = () => Api.get('/api/bookings/get', config);

// Delete a booking
export const deleteBookingApi = (id) => Api.delete(`/api/bookings/${id}`, config);
