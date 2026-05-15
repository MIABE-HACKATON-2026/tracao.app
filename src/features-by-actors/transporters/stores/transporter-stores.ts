import { create } from "zustand";
import { ApiClient } from "../../../shared/api/api-client";
import type { Transport } from "../../stores/types/transport";

interface TransporterTransportState {
    deliveries: Transport[];
    isLoading: boolean;
    error: string | null;
    fetchDeliveries: () => Promise<void>;
}

export const useTransporterTransportsStore = create<TransporterTransportState>((set) => ({
    deliveries: [],
    isLoading: false,
    error: null,
    fetchDeliveries: async () => {
        set({ isLoading: true, error: null });
        try {
            const transports = await ApiClient.get<Transport[]>("/transports/");
            set({ deliveries: transports, isLoading: false });
        } catch (error: any) {
            set({ error: error.response?.data?.detail || "Erreur lors de la récupération des livraisons", isLoading: false });
        }
    }
}));
