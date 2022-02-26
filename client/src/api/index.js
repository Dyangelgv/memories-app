import axios from 'axios';
const url_api = 'https://memories-app-project123.herokuapp.com/api/';

//const url_api = "http://localhost:5000/api";

const API = axios.create({baseURL: url_api});

//Interccionaremos el req
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        const { token } = JSON.parse(localStorage.getItem('profile'));
        req.headers.authorization = `Bearer ${token}`;
    }

    return req;
})

//posts
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostById = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post(`/posts`, newPost);
export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`,{value});

//auth
export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);