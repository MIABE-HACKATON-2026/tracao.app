import { create } from "zustand";
import type { Store } from "../types/store";
import storesService from "../services/stores.service";

interface StoresState {
    store: Store | null;
    isLoading: boolean;
    error: string | null;
    fetchStore: () => Promise<void>;
    updateStore: (data: Partial<Store> | FormData) => Promise<void>;
}

export const useStoresStore = create<StoresState>((set) => ({
    store: null,
    isLoading: false,
    error: null,

    fetchStore: async () => {
        set({ isLoading: true, error: null });
        try {
            const stores = await storesService.getStores();
            set({ store: stores[0] || null, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur lors du chargement de la coopérative",
                isLoading: false
            });
        }
    },

    updateStore: async (data) => {
        const { store: currentStore } = useStoresStore.getState();
        if (!currentStore) return;
        
        set({ isLoading: true, error: null });
        try {
            const store = await storesService.updateStore(currentStore.id, data);
            set({ store, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur lors de la modification",
                isLoading: false
            });
            throw error;
        }
    }
}));
