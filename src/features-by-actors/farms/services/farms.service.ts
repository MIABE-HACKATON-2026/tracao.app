import { ApiClient } from "../../../shared/api/api-client";
import type { Parcel } from "../types/parcel";

class FarmsService {
    async getParcels(): Promise<Parcel[]> {
        return await ApiClient.get<Parcel[]>("/parcels/");
    }

    async getParcel(id: string): Promise<Parcel> {
        return await ApiClient.get<Parcel>(`/parcels/${id}/`);
    }

    async createParcel(data: Partial<Parcel>): Promise<Parcel> {
        return await ApiClient.post<Parcel>("/parcels/", data);
    }

    async updateParcel(id: string, data: Partial<Parcel>): Promise<Parcel> {
        return await ApiClient.patch<Parcel>(`/parcels/${id}/`, data);
    }

    async deleteParcel(id: string): Promise<void> {
        await ApiClient.delete(`/parcels/${id}/`);
    }
}

export default new FarmsService();
