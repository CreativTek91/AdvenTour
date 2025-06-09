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
 async (error) => {
    // Handle errors globally
    console.error("API Error in interceptor:", error);
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config.retry) {
      originalRequest.retry = true;
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/refresh`, { withCredentials: true });
        localStorage.setItem("token", response.data.accessToken);
        console.log(
          "Token refreshed successfully in http interceptor:response.data.accessToken",
          response.data.accessToken
        );
        return $api.request(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token error:NOT AUTHORISED!", refreshError);
        return Promise.reject(refreshError);
      }
    }
   throw error; // If not a 401 error or retry failed, throw the error
    // return Promise.reject(error);
  }
);

export default $api;
