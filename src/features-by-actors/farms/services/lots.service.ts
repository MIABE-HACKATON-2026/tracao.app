import { ApiClient } from "../../../shared/api/api-client";
import type { Batch } from "../types/batch";

class LotsService {
    async getLots(): Promise<Batch[]> {
        return await ApiClient.get<Batch[]>("/batches/");
    }

    async getLot(id: string): Promise<Batch> {
        return await ApiClient.get<Batch>(`/batches/${id}/`);
    }

    async createLot(data: Partial<Batch>): Promise<Batch> {
        return await ApiClient.post<Batch>("/batches/", data);
    }

    async updateLot(id: string, data: Partial<Batch>): Promise<Batch> {
        return await ApiClient.patch<Batch>(`/batches/${id}/`, data);
    }

    async deleteLot(id: string): Promise<void> {
        await ApiClient.delete(`/batches/${id}/`);
    }
}

export default new LotsService();
