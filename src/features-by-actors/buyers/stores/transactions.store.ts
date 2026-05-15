import { create } from "zustand";
import type { Transaction } from "../../../shared/types";
import buyerTransactionsService from "../services/transactions.service";

interface BuyerTxState {
    transactions: Transaction[];
    isLoading: boolean;
    error: string | null;
    fetchTransactions: () => Promise<void>;
}

export const useBuyerTxStore = create<BuyerTxState>((set) => ({
    transactions: [],
    isLoading: false,
    error: null,

    fetchTransactions: async () => {
        set({ isLoading: true, error: null });
        try {
            const transactions = await buyerTransactionsService.getTransactions();
            set({ transactions, isLoading: false });
        } catch (error: any) {
            set({ error: error.response?.data?.detail || "Erreur", isLoading: false });
        }
    }
}));
