import axios from "axios";

// Create base Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api", // change if backend URL differs
  withCredentials: true,
});

// ✅ Automatically attach token to every request if available
API.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch {
        // if JSON parse fails, clear storage to prevent loops
        localStorage.removeItem("user");
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Optional: handle expired or invalid tokens globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Session expired or unauthorized");
      localStorage.removeItem("user");
      window.location.href = "/login"; // redirect user if token invalid
    }
    return Promise.reject(error);
  }
);

export default API;
