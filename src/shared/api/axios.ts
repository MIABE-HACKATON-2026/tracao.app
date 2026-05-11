import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { useSession } from '../../features-by-actors/auth/stores/session.store';

// 1. Create Axios instance
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Request Interceptor: Attach JWT Token
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = useSession.getState().accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Response Interceptor: Global Error Handling & Token Refresh
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;
        
        // If 401 Unauthorized and we haven't retried yet
        if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
            (originalRequest as any)._retry = true;
            
            try {
                const refreshToken = useSession.getState().refreshToken;
                if (!refreshToken) throw new Error('No refresh token available');
                
                // Call refresh endpoint directly using a new axios instance to avoid loops
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh/`, {
                    refresh: refreshToken
                });
                
                const { access, refresh } = response.data;
                
                // Update tokens in store
                useSession.getState().setTokens(access, refresh || refreshToken);
                
                // Retry the original request with new token
                originalRequest.headers.Authorization = `Bearer ${access}`;
                return axiosInstance(originalRequest);
                
            } catch (refreshError) {
                // If refresh fails, log out the user
                useSession.getState().logout();
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);
