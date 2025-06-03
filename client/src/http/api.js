import axios from "axios";

const $api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // This is important for sending cookies
});

$api.interceptors.request.use((config) => {
 config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
$api.interceptors.response.use(
  (response) => {
    // You can add any response interceptors here if needed
    return response;
  },
  (error) => {
    // Handle errors globally
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default $api;
