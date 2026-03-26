import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/access/refresh')) {
            originalRequest._retry = true;
            try {
                const res = await axios.post('http://localhost:8080/access/refresh', {}, { withCredentials: true });
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
