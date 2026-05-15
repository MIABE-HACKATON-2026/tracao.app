import { ApiClient } from "../../../shared/api/api-client";
import type { Batch } from "../../farms/types/batch";

class MarketService {
    async getAvailableBatches(): Promise<Batch[]> {
        return await ApiClient.get<Batch[]>("/batches/");
    }

    async getBatch(id: string): Promise<Batch> {
        return await ApiClient.get<Batch>(`/batches/${id}/`);
    }
}

export default new MarketService();
