import { ApiClient } from "../../../shared/api/api-client";
import type { Transport } from "../types/transport";

class TransportsService {
    async getTransports(): Promise<Transport[]> {
        return await ApiClient.get<Transport[]>("/transports/");
    }

    async getTransport(id: string): Promise<Transport> {
        return await ApiClient.get<Transport>(`/transports/${id}/`);
    }

    async createTransport(data: Partial<Transport>): Promise<Transport> {
        return await ApiClient.post<Transport>("/transports/", data);
    }

    async updateTransport(id: string, data: Partial<Transport>): Promise<Transport> {
        return await ApiClient.patch<Transport>(`/transports/${id}/`, data);
    }

    async confirmDeparture(id: string): Promise<Transport> {
        return await ApiClient.post<Transport>(`/transports/${id}/confirm-departure/`);
    }

    async confirmDelivery(id: string): Promise<Transport> {
        return await ApiClient.post<Transport>(`/transports/${id}/confirm-delivery/`);
    }

    async getPendingTransports(): Promise<Transport[]> {
        const transports = await ApiClient.get<Transport[]>("/transports/");
        return transports.filter((t: Transport) => t.status === 'pending');
    }
}

export default new TransportsService();
