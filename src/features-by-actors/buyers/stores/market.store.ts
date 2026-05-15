import { create } from "zustand";
import type { Batch } from "../../farms/types/batch";
import marketService from "../services/market.service";

interface MarketState {
    batches: Batch[];
    isLoading: boolean;
    error: string | null;
    fetchBatches: () => Promise<void>;
}

export const useMarketStore = create<MarketState>((set) => ({
    batches: [],
    isLoading: false,
    error: null,

    fetchBatches: async () => {
        set({ isLoading: true, error: null });
        try {
            const batches = await marketService.getAvailableBatches();
            set({ batches: batches.filter(b => b.status === 'approved'), isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur lors du chargement",
                isLoading: false
            });
        }
    }
}));
