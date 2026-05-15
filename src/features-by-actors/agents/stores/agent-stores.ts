import { create } from "zustand";
import { ApiClient } from "../../../shared/api/api-client";

interface SyncItem {
    id: string;
    action_type: string;
    status: 'pending' | 'synced' | 'conflict';
    payload: any;
    created_locally_at: string;
}

interface AgentSyncState {
    items: SyncItem[];
    isLoading: boolean;
    error: string | null;
    fetchSync: () => Promise<void>;
}

export const useAgentSyncStore = create<AgentSyncState>((set) => ({
    items: [],
    isLoading: false,
    error: null,
    fetchSync: async () => {
        set({ isLoading: true, error: null });
        try {
            const items = await ApiClient.get<SyncItem[]>("/sync-queue/");
            set({ items, isLoading: false });
        } catch (error: any) {
            set({ error: "Erreur lors de la synchronisation", isLoading: false });
        }
    }
}));
