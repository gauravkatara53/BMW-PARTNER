import axios from "axios";

// Base URL for API
const BASE_URL = "/api/v1/";
//https://bmw-backend-l85a.onrender.com/api/v1/
//http://localhost:5001/api/v1

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 60000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure cookies are sent with every request
});

// Add interceptor for adding authentication token
api.interceptors.request.use(
  (config) => {
    console.log("🔄 Making request to:", config.url);
    return config;
  },
  (error) => Promise.reject(error)
);
console.log();

// Generic API request function
interface ApiService {
  get: <T>(url: string, params?: Record<string, any>) => Promise<T>;
  post: <T>(url: string, data: any, config?: any) => Promise<T>;
  put: <T>(url: string, data: any) => Promise<T>;
  patch: <T>(url: string, data: any, config?: any) => Promise<T>; // ✅ Fix: Accept config
  delete: <T>(url: string) => Promise<T>;
}

export const apiService: ApiService = {
  get: (url, params = {}) => api.get(url, { params }).then((res) => res.data),
  post: (url, data, config = {}) =>
    api.post(url, data, config).then((res) => res.data),
  put: (url, data) => api.put(url, data).then((res) => res.data),
  patch: (url, data, config = {}) =>
    api.patch(url, data, config).then((res) => res.data), // ✅ Fix applied
  delete: (url) => api.delete(url).then((res) => res.data),
};

export default api;
