import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    throw new Error("VITE_API_URL não configurada.");
}

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/access/refresh')) {
            originalRequest._retry = true;
            try {
                const res = await axios.post(`${API_URL}/access/refresh`, {}, { withCredentials: true });
                const { accessToken } = res.data;

                api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                
                return api(originalRequest);
            } catch (refreshError) {
                delete api.defaults.headers.common['Authorization'];
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login'; 
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
