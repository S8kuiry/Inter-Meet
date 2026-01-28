import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

// Add this interceptor to manually attach the Clerk Token
axiosInstance.interceptors.request.use(async (config) => {
    try {
        // window.Clerk is available globally if you use ClerkProvider
        if (window.Clerk?.session) {
            const token = await window.Clerk.session.getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
    } catch (error) {
        console.error("Could not get Clerk token", error);
    }
    return config;
});

export default axiosInstance;