import { create } from "zustand";
import type { Transport } from "../types/transport";
import transportsService from "../services/transports.service";

interface TransportsState {
    transports: Transport[];
    isLoading: boolean;
    error: string | null;
    fetchTransports: () => Promise<void>;
    confirmDeparture: (id: string) => Promise<void>;
    confirmDelivery: (id: string) => Promise<void>;
    createTransport: (data: Partial<Transport>) => Promise<void>;
}

export const useTransportsStore = create<TransportsState>((set) => ({
    transports: [],
    isLoading: false,
    error: null,

    fetchTransports: async () => {
        set({ isLoading: true, error: null });
        try {
            const transports = await transportsService.getTransports();
            set({ transports, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur lors du chargement des transports",
                isLoading: false
            });
        }
    },

    confirmDeparture: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const updated = await transportsService.confirmDeparture(id);
            set((state) => ({
                transports: state.transports.map(t => t.id === id ? updated : t),
                isLoading: false
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur",
                isLoading: false
            });
        }
    },

    confirmDelivery: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const updated = await transportsService.confirmDelivery(id);
            set((state) => ({
                transports: state.transports.map(t => t.id === id ? updated : t),
                isLoading: false
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur",
                isLoading: false
            });
        }
    },

    createTransport: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const created = await transportsService.createTransport(data);
            set((state) => ({
                transports: [created, ...state.transports],
                isLoading: false
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur lors de la création du transport",
                isLoading: false
            });
        }
    }
}));
