import { ApiClient } from "../../../shared/api/api-client";
import type { Transaction } from "../../../shared/types";

class BuyerTransactionsService {
    async getTransactions(): Promise<Transaction[]> {
        return await ApiClient.get<Transaction[]>("/transactions/");
    }

    async createTransaction(data: Partial<Transaction>): Promise<Transaction> {
        return await ApiClient.post<Transaction>("/transactions/", data);
    }

    async completeTransaction(id: string): Promise<Transaction> {
        return await ApiClient.post<Transaction>(`/transactions/${id}/complete/`);
    }
}

export default new BuyerTransactionsService();
