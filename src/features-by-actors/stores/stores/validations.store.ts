import { create } from "zustand";
import validationsService from "../services/validations.service";

interface PendingItem {
    id: string;
    name: string;
    farmer?: string;
    status: string;
    created_at: string;
    // Batch specific
    unique_code?: string;
    crop_type?: string;
    estimated_quantity?: number;
    // Parcel specific
    area?: number;
    culture?: string;
    farmer_name?: string;
    latitude?: number;
    longitude?: number;
}

interface ValidationsState {
    pendingParcels: PendingItem[];
    pendingBatches: PendingItem[];
    isLoading: boolean;
    error: string | null;
    fetchPendingParcels: () => Promise<void>;
    fetchPendingBatches: () => Promise<void>;
    validateParcel: (id: string, data: { status: 'approved' | 'rejected'; comment?: string }) => Promise<void>;
    validateBatch: (id: string, data: { status: 'approved' | 'rejected'; comment?: string }) => Promise<void>;
}

export const useValidationsStore = create<ValidationsState>((set) => ({
    pendingParcels: [],
    pendingBatches: [],
    isLoading: false,
    error: null,

    fetchPendingParcels: async () => {
        set({ isLoading: true, error: null });
        try {
            const pendingParcels = await validationsService.getPendingParcels();
            set({ pendingParcels, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur lors du chargement",
                isLoading: false
            });
        }
    },

    fetchPendingBatches: async () => {
        set({ isLoading: true, error: null });
        try {
            const pendingBatches = await validationsService.getPendingBatches();
            set({ pendingBatches, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur lors du chargement",
                isLoading: false
            });
        }
    },

    validateParcel: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            await validationsService.validateParcel(id, data);
            set((state) => ({
                pendingParcels: state.pendingParcels.filter(p => p.id !== id),
                isLoading: false
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur lors de la validation",
                isLoading: false
            });
        }
    },

    validateBatch: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            await validationsService.validateBatch(id, data);
            set((state) => ({
                pendingBatches: state.pendingBatches.filter(b => b.id !== id),
                isLoading: false
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur lors de la validation",
                isLoading: false
            });
        }
    }
}));
