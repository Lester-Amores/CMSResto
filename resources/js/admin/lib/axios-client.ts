import axios, { AxiosInstance, AxiosError } from 'axios';

const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : '';

const http: AxiosInstance = axios.create({
    baseURL: '/',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': csrfToken || '',
    },
});

http.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && originalRequest?.url !== '/api/login') {
            localStorage.removeItem('session_id');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const isAxiosError = (error: unknown): error is AxiosError => {
    return axios.isAxiosError(error);
};

export default http;
