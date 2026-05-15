import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosInstance } from './axios';

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

function isPaginated<T>(data: any): data is PaginatedResponse<T> {
    return typeof data === 'object' && data !== null && 'results' in data && 'count' in data;
}

export const ApiClient = {
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await axiosInstance.get(url, config);
        if (isPaginated(response.data)) {
            return response.data.results as T;
        }
        return response.data;
    },

    async getPaginated<T>(url: string, config?: AxiosRequestConfig): Promise<PaginatedResponse<T>> {
        const response: AxiosResponse<PaginatedResponse<T>> = await axiosInstance.get(url, config);
        return response.data;
    },

    async post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await axiosInstance.post(url, data, config);
        return response.data;
    },

    async put<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await axiosInstance.put(url, data, config);
        return response.data;
    },

    async patch<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await axiosInstance.patch(url, data, config);
        return response.data;
    },

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await axiosInstance.delete(url, config);
        return response.data;
    }
};
