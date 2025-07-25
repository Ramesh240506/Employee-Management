import axios from 'axios';
const API_BASE_URL = 'http://localhost:8778/api';
// Use your actual DevTunnel backend URL here
// const API_BASE_URL = 'https://xtlf8z4r-8778.inc1.devtunnels.ms/api';

const getToken = () => localStorage.getItem("token");
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

export const getEmployees = () => {
    return axios.get(API_BASE_URL, authHeader());
};

export const addEmployee = (formData) => {
    return axios.post(API_BASE_URL, formData, authHeader());
};

export const getEmployeeById = (id) => {
    return axios.get(`${API_BASE_URL}/${id}`, authHeader());
};

export const updateEmployee = (id, formData) => {
    return axios.put(`${API_BASE_URL}/${id}`, formData, authHeader());
};

export const deleteEmployee = (id) => {
    return axios.delete(`${API_BASE_URL}/${id}`, authHeader());
};

export const sortEmployees = (sortBy) => {
    return axios.get(`${API_BASE_URL}/employee/sort?sortBy=${sortBy}`, authHeader());
};

export const registerUser = (formData) => {
    return axios.post(API_BASE_URL+'/register', formData); // no token needed
};

export const loginUser = (formData) => {
    return axios.post(API_BASE_URL+'/login', formData); // no token needed
};
