import { create } from "zustand";
import transformationsService from "../services/transformations.service";
import type { Transformation } from "../../../shared/types";

interface ProcessorStore {
    transformations: Transformation[];
    isLoading: boolean;
    error: string | null;
    fetchTransformations: () => Promise<void>;
    createTransformation: (data: Partial<Transformation>) => Promise<void>;
}

export const useProcessorStore = create<ProcessorStore>((set) => ({
    transformations: [],
    isLoading: false,
    error: null,
    fetchTransformations: async () => {
        set({ isLoading: true });
        try {
            const data = await transformationsService.getTransformations();
            set({ transformations: data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    createTransformation: async (data) => {
        set({ isLoading: true });
        try {
            await transformationsService.createTransformation(data);
            const updated = await transformationsService.getTransformations();
            set({ transformations: updated, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    }
}));
