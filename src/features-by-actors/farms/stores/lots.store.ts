import { create } from "zustand";
import type { Batch } from "../types/batch";
import lotsService from "../services/lots.service";

interface LotsState {
    lots: Batch[];
    isLoading: boolean;
    error: string | null;
    
    // Actions
    fetchLots: () => Promise<void>;
}

export const useLotsStore = create<LotsState>((set) => ({
    lots: [],
    isLoading: false,
    error: null,

    fetchLots: async () => {
        set({ isLoading: true, error: null });
        try {
            const lots = await lotsService.getLots();
            set({ lots, isLoading: false });
        } catch (error: any) {
            set({ 
                error: error.response?.data?.detail || "Erreur lors du chargement des lots", 
                isLoading: false 
            });
        }
    }
}));
