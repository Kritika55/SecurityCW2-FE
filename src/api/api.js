// Creating test api
import {api, config} from "../utils/axios";
import axios from 'axios';


export const testApi = () => api.get('/test')
// Example API call for logout
export const logoutApi = () => {
    return api.post('/api/users/logout', {}, { withCredentials: true });
};

// Example API call to check if the session is still valid
export const checkSessionApi = () => {
    return api.get('/api/users/check-session', { withCredentials: true });
};

// Creating register api
export const registerUserApi = (data) => api.post('/api/users/create', data)

// Creating login api
export const loginUserApi = (data) => api.post('/api/users/login', data)

// create product create api
export const createProductApi = (data) => api.post('/api/product/create', data, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
})

// Forgot Password API
// export const forgotPasswordApi = (data) => api.post("/api/users/forgetPassword", data);

// Reset Password API
// export const resetPasswordApi = ( newPassword) => {
//     return api.post(`/api/users/reset-password`, { newPassword });
//   };

export const forgotPasswordApi = (data) =>
    api.post("/api/users/forgot/password", data);
  
  //reset password
  export const resetPasswordApi = (data, token) =>
    api.post(`/api/users/password/reset/${token}, data`);
// Profile API
export const profileApi = () => {
    return api.get("/api/users/profile");
};

export const getUser = (userId) => api.get(`/api/users/${userId}`, config);

// fetch all products
export const getAllProducts = () => api.get('/api/product/get_all_products', config)

//fetch single product
export const getSingleProduct = (id) => api.get(`/api/product/get_single_product/${id}`, config)

// delete product (Task)
export const deleteProduct = (id) => api.delete(`/api/product/delete_product/${id}`)

// update product
export const updateProduct = (id, data) => api.put(`/api/product/update_product/${id}`, data, config)

// Creating booking api
export const createBookingApi = (data) => api.post('/api/bookings/create', data, config);

// Fetch all bookings
export const getAllBookingsApi = () => api.get('/api/bookings', config);

// Delete a booking
export const deleteBookingApi = (id) => api.delete(`/api/bookings/${id}`, config);

export const getUserBookings = (userId) => api.get(`/api/bookings/user/${userId}`, config);


// API to create a new chat session
export const createChatApi = (data) => {
    return api.post(`/chat/`, data);
};

// API to fetch chats for a user
export const getUserChatsApi = (userId) => {
    return api.get(`/chat/${userId}`);
};

// API to find a chat between two users
export const findChatApi = (firstId, secondId) => {
    return api.get(`/chat/find/${firstId}/${secondId}`);
};

// API to create messages
export const createMessagesApi = (data) => {
    return api.post(`/message/`, data);
};

// API to get messages
export const getMessagesApi = (chatId) => {
    return api.get(`/message/${chatId}`);
};


export const addToCartApi = (userId, productId, quantity) => {
    return axios.post('/api/cart/add', { userId, productId, quantity });
};

export const updateCartItemQuantityApi = (itemId, newQuantity) => {
    return axios.put('/api/cart/update-quantity', { itemId, newQuantity });
};

export const removeFromCartApi = (userId, productId) => {
    return axios.delete(`/api/cart/${userId}/item/${productId}`);
  };

  // Send OTP API (e.g., during registration or password reset)
export const sendOtpApi = (data) => api.post('/api/users/send-otp', data);

// Verify OTP API
export const verifyOtpApi = ({ email, otp }) => api.post(`/api/users/verify-otp`, { email, otp });


// api/api.js

export const updatePasswordApi = async (data) => {
    const token = localStorage.getItem('token'); // or however you store the token

    const response = await fetch('https://localhost:5000/api/users/update-password', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};






export const getLogsApi = () => {
  return axios.get('https://localhost:5000/api/logs'); 


  

};




  export const getCartItemsApi = async (userId) => {
    // Mock API request, replace with actual API call
    return {
        data: {
            cartItems: [
                {
                    productId: '1',
                    productImage: '/path/to/image.png',
                    productName: 'Sample Product',
                    productPrice: 1000,
                    quantity: 2,
                },
                // Add more mock cart items as needed
            ],

            


        }
    };
}  