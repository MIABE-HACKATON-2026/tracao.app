import { ApiClient } from "../../../shared/api/api-client";

class ComplianceService {
    async getEudrReport(batchId: string): Promise<any> {
        return await ApiClient.get<any>(`/reports/eudr-compliance/${batchId}/`);
    }

    async getProductionStats(): Promise<any> {
        return await ApiClient.get<any>("/reports/statistics/production/");
    }
}

export default new ComplianceService();
