import { ApiClient } from "../../../shared/api/api-client";
import type { Transport } from "../../stores/types/transport";

class BuyerTransportService {
    async getTransports(): Promise<Transport[]> {
        return await ApiClient.get<Transport[]>("/transports/");
    }

    async getTransport(id: string): Promise<Transport> {
        return await ApiClient.get<Transport>(`/transports/${id}/`);
    }

    async createTransport(data: Partial<Transport>): Promise<Transport> {
        return await ApiClient.post<Transport>("/transports/", data);
    }

    async getMyTransports(): Promise<Transport[]> {
        const transports = await ApiClient.get<Transport[]>("/transports/");
        return transports;
    }
}

export default new BuyerTransportService();
