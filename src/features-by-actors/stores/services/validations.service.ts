import { ApiClient } from "../../../shared/api/api-client";

class ValidationsService {
    async validateParcel(parcelId: string, data: { status: 'approved' | 'rejected'; comment?: string }): Promise<any> {
        return await ApiClient.post(`/parcels/${parcelId}/validate/`, data);
    }

    async validateBatch(batchId: string, data: { status: 'approved' | 'rejected'; comment?: string }): Promise<any> {
        return await ApiClient.post(`/batches/${batchId}/validate/`, data);
    }

    async getPendingParcels(): Promise<any[]> {
        const parcels = await ApiClient.get<any[]>("/parcels/");
        return parcels
            .filter((p: any) => p.status === 'pending')
            .map((p: any) => ({
                ...p,
                farmer_name: p.farmer_details ? `${p.farmer_details.first_name} ${p.farmer_details.last_name}` : "—",
                latitude: p.gps_coordinates?.[0]?.[1],
                longitude: p.gps_coordinates?.[0]?.[0]
            }));
    }

    async getPendingBatches(): Promise<any[]> {
        const batches = await ApiClient.get<any[]>("/batches/");
        return batches
            .filter((b: any) => b.status === 'pending')
            .map((b: any) => ({
                ...b,
                farmer_name: b.farmer_details ? `${b.farmer_details.first_name} ${b.farmer_details.last_name}` : (b.farmer?.phone || "—"),
            }));
    }
}

export default new ValidationsService();
