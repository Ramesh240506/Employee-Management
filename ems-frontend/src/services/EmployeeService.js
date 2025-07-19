import axios from 'axios';
const API_BASE_URL = 'http://localhost:8778/api';
// Use your actual DevTunnel backend URL here
// const API_BASE_URL = 'https://xtlf8z4r-8778.inc1.devtunnels.ms/api';

export const getEmployees = () => {
        return axios.get(API_BASE_URL);
}

export const addEmployee = (formData) => axios.post(API_BASE_URL, formData);

export const getEmployeeById = (id) => axios.get(API_BASE_URL + '/' + id);

export const updateEmployee = (id, formData) => axios.put(API_BASE_URL+'/'+id, formData);

export const deleteEmployee = (id) => axios.delete(API_BASE_URL + '/'+ id);

export const sortEmployees = (sortBy) => {
    return axios.get(`${API_BASE_URL}/employee/sort?sortBy=${sortBy}`);
}

export const registerUser = (formData) => {
    return axios.post(API_BASE_URL+'/register', formData);
}
export const loginUser = (formData) => {
    return axios.post(API_BASE_URL+'/login', formData);
}