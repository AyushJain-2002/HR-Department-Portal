import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});
// List of routes that should NOT include the Authorization token
const publicRoutes = [
    "/public-endpoint-1",
    "/public-endpoint-2",
    "/login",
    "/register"
];

// Interceptor to add Authorization header conditionally
instance.interceptors.request.use((config) => {
    const token = Cookies.get("authToken");

    // Check if the request URL includes any of the public routes
    const isPublicRoute = publicRoutes.some(route => config.url.includes(route));

    if (token && !isPublicRoute) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default instance;
