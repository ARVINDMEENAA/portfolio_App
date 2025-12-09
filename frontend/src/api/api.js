import axios from 'axios';

// create axios instance with base URL from env
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Project APIs
export const getProjects = () => API.get('/projects');
export const createProject = (formData) => API.post('/projects', formData);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// Client APIs
export const getClients = () => API.get('/clients');
export const createClient = (formData) => API.post('/clients', formData);
export const deleteClient = (id) => API.delete(`/clients/${id}`);

// Contact APIs
export const createContact = (data) => API.post('/contacts', data);
export const getContacts = () => API.get('/contacts');

// Newsletter APIs
export const subscribeNewsletter = (data) => API.post('/newsletter', data);
export const getSubscribers = () => API.get('/newsletter');
