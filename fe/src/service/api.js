import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Include cookies for authentication if needed
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        console.log('Authorization Token:', token); // Debugging line
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
// Public Endpoints
export const login = (data) => api.post('/api/users/login', data);
export const signup = (data) => api.post('/api/users/signup', data);
export const forgotPassword = (data) => api.post('/api/users/forgot-password', data);
export const resetPassword = (data) => api.post('/api/users/reset-password', data);

// Product Endpoints
export const getAllProducts = () => api.get('/api/products/getAll');
export const getProducts = (params) => api.get('/api/products', { params });
export const addProduct = (data) => api.post('/api/products/add', data);
export const updateProduct = (id, data) => api.put(`/api/products/update/${id}`, data);
export const deleteProduct = (id) => api.delete(`/api/products/delete/${id}`);

// Admin Endpoints
export const getUser = (id) => api.get(`/api/users/get/${id}`);
export const updateUserStatus = (id, status) => api.put(`/api/users/updateStatus/${id}`, { status });
export const getAllBills = () => api.get('/api/bills/getAll');
export const getAllUsers = () => api.get('/api/users');


//Category Endpoints
export const getCategory = () => api.get('/api/category/getAll');
export const addCategory = (data) => api.post('/api/category/add', data);
export const updateCategory = (id, data) => api.put(`/api/category/update/${id}`, data);
export const deleteCategory = (id) => api.delete(`/api/category/delete/${id}`);
// User and Admin Endpoints
export const getProductDetails = (id) => api.get(`/api/product/get/${id}`); // Added /api/
export const getProductByCategory = (categoryId) => api.get(`/api/product/category/${categoryId}`); // Added /api/
export const updateUser = (id, data) => api.put(`/api/users/update/${id}`, data);