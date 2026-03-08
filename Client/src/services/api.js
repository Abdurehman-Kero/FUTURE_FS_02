// src/services/api.js
import axios from "axios";

// Create axios instance with base URL
const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Add token to requests if it exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Lead API calls
export const leadAPI = {
  // Get all leads
  getAll: () => API.get("/leads"),

  // Get single lead
  getOne: (id) => API.get(`/leads/${id}`),

  // Create new lead
  create: (data) => API.post("/leads", data),

  // Update lead
  update: (id, data) => API.put(`/leads/${id}`, data),

  // Delete lead
  delete: (id) => API.delete(`/leads/${id}`),
};

// Auth API calls
export const authAPI = {
  // Register new admin
  register: (data) => API.post("/auth/register", data),

  // Login
  login: (data) => API.post("/auth/login", data),

  // Get current user
  getMe: () => API.get("/auth/me"),
};

export default API;
