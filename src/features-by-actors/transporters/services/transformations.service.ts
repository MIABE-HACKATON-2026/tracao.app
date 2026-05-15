import { ApiClient } from "../../../shared/api/api-client";
import type { Transformation } from "../../../shared/types";

class OperatorTransfoService {
    async getTransformations(): Promise<Transformation[]> {
        return await ApiClient.get<Transformation[]>("/transformations/");
    }

    async getTransformation(id: string): Promise<Transformation> {
        return await ApiClient.get<Transformation>(`/transformations/${id}/`);
    }

    async createTransformation(data: Partial<Transformation>): Promise<Transformation> {
        return await ApiClient.post<Transformation>("/transformations/", data);
    }

    async addInput(transformationId: string, batchId: string): Promise<Transformation> {
        return await ApiClient.post<Transformation>(`/transformations/${transformationId}/add-input/`, { batch_id: batchId });
    }

    async addOutput(transformationId: string, batchId: string): Promise<Transformation> {
        return await ApiClient.post<Transformation>(`/transformations/${transformationId}/add-output/`, { batch_id: batchId });
    }

    async lockTransformation(id: string): Promise<Transformation> {
        return await ApiClient.post<Transformation>(`/transformations/${id}/lock/`);
    }

    async getPendingTransformations(): Promise<Transformation[]> {
        const transformations = await ApiClient.get<Transformation[]>("/transformations/");
        return transformations.filter((t: Transformation) => t.status === 'pending');
    }
}

export default new OperatorTransfoService();
