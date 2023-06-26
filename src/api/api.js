import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getPost = (id) => axios.get(`${API_URL}/posts/${id}`);

export const getPosts = (page = 1, limit = 10) => axios.get(`${API_URL}/posts?_page=${page}&_limit=${limit}`);

export const getUserPosts = (userId) => axios.get(`${API_URL}/posts?userId=${userId}`);

export const getUserDetails = (userId) => axios.get(`${API_URL}/users/${userId}`);

export const getComments = (postId) => axios.get(`${API_URL}/posts/${postId}/comments`);
