import { create } from "zustand";
import type { Transport } from "../../stores/types/transport";
import transportsService from "../../stores/services/transports.service";

interface ProcessorTransportState {
    deliveries: Transport[];
    isLoading: boolean;
    error: string | null;
    fetchDeliveries: () => Promise<void>;
}

export const useProcessorTransportsStore = create<ProcessorTransportState>((set) => ({
    deliveries: [],
    isLoading: false,
    error: null,
    fetchDeliveries: async () => {
        set({ isLoading: true, error: null });
        try {
            const transports = await transportsService.getTransports();
            set({ deliveries: transports, isLoading: false });
        } catch (error: any) {
            set({ error: error.response?.data?.detail || "Erreur", isLoading: false });
        }
    }
}));

// Sync queue store
import { ApiClient } from "../../../shared/api/api-client";
interface SyncItem {
    id: string; action_type: string; status: string; payload: any; created_locally_at: string;
}
interface SyncState {
    items: SyncItem[];
    isLoading: boolean;
    fetchSync: () => Promise<void>;
}
export const useSyncStore = create<SyncState>((set) => ({
    items: [], isLoading: false,
    fetchSync: async () => {
        set({ isLoading: true });
        try {
            const items = await ApiClient.get<SyncItem[]>("/sync-queue/");
            set({ items, isLoading: false });
        } catch { set({ isLoading: false }); }
    }
}));

// Admin stores moved to features-by-actors/admin/stores/admin.store.ts
