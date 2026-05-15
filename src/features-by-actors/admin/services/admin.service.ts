import { ApiClient } from "../../../shared/api/api-client";
import type {
    FraudAlert,
    BlockchainRecord,
    Transaction,
    TraceabilityLog,
    Transformation
} from "../../../shared/types";
import type { User } from "../types/admin.types";

export interface DashboardStats {
    users: Array<{ role: string; status: string; count: number }>;
    batches: Array<{ status: string; count: number }>;
    transactions: { today: any; month: any };
    critical_alerts: number;
    blockchain: Array<{ entity_type: string; count: number }>;
}

export interface Cooperative {
    id: string;
    name: string;
    status: 'pending' | 'approved' | 'rejected';
    member_count: number;
    created_at: string;
}

export interface KYCRecord {
    id: string;
    user_id: string;
    user_name: string;
    role: string;
    status: 'pending' | 'approved' | 'rejected';
    submitted_at: string;
    documents: string[];
}

class AdminService {
    async getStats(): Promise<DashboardStats> {
        return await ApiClient.get<DashboardStats>("/admin/dashboard/");
    }

    async getCooperatives(): Promise<Cooperative[]> {
        return await ApiClient.get<Cooperative[]>("/stores/");
    }

    async getKYCRecords(): Promise<KYCRecord[]> {
        return await ApiClient.get<KYCRecord[]>("/admin/kyc/");
    }

    async getFraudAlerts(): Promise<FraudAlert[]> {
        return await ApiClient.get<FraudAlert[]>("/fraud-alerts/");
    }

    async getBlockchainRecords(): Promise<BlockchainRecord[]> {
        return await ApiClient.get<BlockchainRecord[]>("/blockchain/");
    }

    async getLogs(): Promise<TraceabilityLog[]> {
        return await ApiClient.get<TraceabilityLog[]>("/traceability/");
    }

    async getTransactions(): Promise<Transaction[]> {
        return await ApiClient.get<Transaction[]>("/transactions/");
    }

    async getUsers(): Promise<User[]> {
        return await ApiClient.get<User[]>("/admin/users/");
    }

    async createUser(data: any): Promise<User> {
        return await ApiClient.post<User>("/admin/users/", data);
    }

    async updateUser(id: string, data: any): Promise<User> {
        return await ApiClient.patch<User>(`/admin/users/${id}/`, data);
    }

    async deleteUser(id: string): Promise<void> {
        return await ApiClient.delete(`/admin/users/${id}/`);
    }

    async toggleUserStatus(id: string, isActive: boolean): Promise<any> {
        const action = isActive ? 'reactivate' : 'suspend';
        return await ApiClient.post(`/admin/users/${id}/${action}/`, {});
    }

    async getTransformations(): Promise<Transformation[]> {
        return await ApiClient.get<Transformation[]>("/transformations/");
    }

    async getStores(): Promise<User[]> {
        return await ApiClient.get<User[]>("/admin/stores/");
    }

    async toggleStoreStatus(id: string, isActive: boolean): Promise<any> {
        const action = isActive ? 'reactivate' : 'suspend';
        return await ApiClient.post(`/admin/stores/${id}/${action}/`, {});
    }

    async getAdminBatches(): Promise<any[]> {
        return await ApiClient.get<any[]>("/admin/batches/");
    }

    async toggleBatchStatus(id: string, status: 'approve' | 'reject'): Promise<any> {
        return await ApiClient.post(`/admin/batches/${id}/${status}/`, {});
    }

    async getAdminTransactions(): Promise<any[]> {
        return await ApiClient.get<any[]>("/admin/transactions/");
    }

    async completeTransaction(id: string): Promise<any> {
        return await ApiClient.post(`/admin/transactions/${id}/complete/`, {});
    }
}

export default new AdminService();
