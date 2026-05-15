import { ApiClient } from "../../../shared/api/api-client";
import type { FraudAlert } from "../../../shared/types";

class FraudService {
    async getAlerts(): Promise<FraudAlert[]> {
        return await ApiClient.get<FraudAlert[]>("/fraud-alerts/");
    }

    async resolveAlert(id: string, data: { resolution_comment?: string }): Promise<FraudAlert> {
        return await ApiClient.post<FraudAlert>(`/fraud-alerts/${id}/resolve/`, data);
    }
}

export default new FraudService();
