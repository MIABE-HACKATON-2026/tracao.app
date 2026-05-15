import { ApiClient } from "../../../shared/api/api-client";
import type { StoreAgent } from "../types/store-agent";

class AgentsService {
    async getAgents(): Promise<StoreAgent[]> {
        return await ApiClient.get<StoreAgent[]>("/store-agents/");
    }

    async getAgent(id: string): Promise<StoreAgent> {
        return await ApiClient.get<StoreAgent>(`/store-agents/${id}/`);
    }

    async createAgent(data: Partial<StoreAgent>): Promise<StoreAgent> {
        return await ApiClient.post<StoreAgent>("/store-agents/", data);
    }

    async updateAgent(id: string, data: Partial<StoreAgent>): Promise<StoreAgent> {
        return await ApiClient.patch<StoreAgent>(`/store-agents/${id}/`, data);
    }

    async deleteAgent(id: string): Promise<void> {
        await ApiClient.delete(`/store-agents/${id}/`);
    }
}

export default new AgentsService();
