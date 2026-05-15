import { ApiClient } from "../../../shared/api/api-client";
import type { Store } from "../types/store";

class StoresService {
    async getStores(): Promise<Store[]> {
        return await ApiClient.get<Store[]>("/stores/");
    }

    async getStore(id: string): Promise<Store> {
        return await ApiClient.get<Store>(`/stores/${id}/`);
    }

    async createStore(data: Partial<Store>): Promise<Store> {
        return await ApiClient.post<Store>("/stores/", data);
    }

    async updateStore(id: string, data: Partial<Store> | FormData): Promise<Store> {
        return await ApiClient.patch<Store>(`/stores/${id}/`, data);
    }

    async deleteStore(id: string): Promise<void> {
        await ApiClient.delete(`/stores/${id}/`);
    }
}

export default new StoresService();
