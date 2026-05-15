import { create } from "zustand";
import type { FraudAlert } from "../../../shared/types";
import fraudService from "../services/fraud.service";

interface FraudState {
    alerts: FraudAlert[];
    isLoading: boolean;
    error: string | null;
    fetchAlerts: () => Promise<void>;
    resolveAlert: (id: string, data?: { resolution_comment?: string }) => Promise<void>;
}

export const useFraudStore = create<FraudState>((set) => ({
    alerts: [],
    isLoading: false,
    error: null,

    fetchAlerts: async () => {
        set({ isLoading: true, error: null });
        try {
            const alerts = await fraudService.getAlerts();
            set({ alerts, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur lors du chargement des alertes",
                isLoading: false
            });
        }
    },

    resolveAlert: async (id, data = {}) => {
        set({ isLoading: true, error: null });
        try {
            await fraudService.resolveAlert(id, data);
            set((state) => ({
                alerts: state.alerts.filter(a => a.id !== id),
                isLoading: false
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur lors de la résolution",
                isLoading: false
            });
        }
    }
}));
