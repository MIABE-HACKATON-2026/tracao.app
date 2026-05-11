import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosInstance } from './axios';

/**
 * Interface globale pour standardiser les retours de l'API.
 * Optionnel selon le format exact renvoyé par votre backend Django.
 */
export interface ApiResponse<T> {
    data: T;
    message?: string;
    // status?: number;
}

export const ApiClient = {
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await axiosInstance.get(url, config);
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
