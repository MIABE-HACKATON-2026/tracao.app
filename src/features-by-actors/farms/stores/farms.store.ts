import { create } from "zustand";
import type { Parcel } from "../types/parcel";
import farmsService from "../services/farms.service";

interface FarmsState {
    parcels: Parcel[];
    isLoading: boolean;
    error: string | null;
    
    // Actions
    fetchParcels: () => Promise<void>;
    addParcel: (data: Partial<Parcel>) => Promise<void>;
    removeParcel: (id: string) => Promise<void>;
}

export const useFarmsStore = create<FarmsState>((set) => ({
    parcels: [],
    isLoading: false,
    error: null,

    fetchParcels: async () => {
        set({ isLoading: true, error: null });
        try {
            const parcels = await farmsService.getParcels();
            set({ parcels, isLoading: false });
        } catch (error: any) {
            set({ 
                error: error.response?.data?.detail || "Erreur lors du chargement des parcelles", 
                isLoading: false 
            });
        }
    },

    addParcel: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const newParcel = await farmsService.createParcel(data);
            set((state) => ({ 
                parcels: [newParcel, ...state.parcels], 
                isLoading: false 
            }));
        } catch (error: any) {
            set({ 
                error: error.response?.data?.detail || "Erreur lors de la création de la parcelle", 
                isLoading: false 
            });
            throw error;
        }
    },

    removeParcel: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await farmsService.deleteParcel(id);
            set((state) => ({ 
                parcels: state.parcels.filter(p => p.id !== id), 
                isLoading: false 
            }));
        } catch (error: any) {
            set({ 
                error: error.response?.data?.detail || "Erreur lors de la suppression de la parcelle", 
                isLoading: false 
            });
        }
    }
}));
