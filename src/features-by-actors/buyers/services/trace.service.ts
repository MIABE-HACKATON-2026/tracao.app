import { ApiClient } from "../../../shared/api/api-client";
import type { TraceabilityLog, BlockchainRecord } from "../../../shared/types";

class TraceService {
    async getTraceability(batchId: string): Promise<TraceabilityLog[]> {
        return await ApiClient.get<TraceabilityLog[]>(`/traceability/?batch_id=${batchId}`);
    }

    async getBlockchainRecords(entityType?: string): Promise<BlockchainRecord[]> {
        const query = entityType ? `?entity_type=${entityType}` : "";
        return await ApiClient.get<BlockchainRecord[]>(`/blockchain/${query}`);
    }

    async scanQR(qrData: string): Promise<any> {
        return await ApiClient.get<any>(`/traceability/scan/${qrData}/`);
    }

    async getEudrReport(batchId: string): Promise<any> {
        return await ApiClient.get<any>(`/reports/eudr-compliance/${batchId}/`);
    }
}

export default new TraceService();
