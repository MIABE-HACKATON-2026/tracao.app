import { create } from "zustand";
import type { StoreAgent } from "../types/store-agent";
import agentsService from "../services/agents.service";

interface AgentsState {
    agents: StoreAgent[];
    isLoading: boolean;
    error: string | null;
    fetchAgents: () => Promise<void>;
    addAgent: (data: Partial<StoreAgent>) => Promise<void>;
}

export const useAgentsStore = create<AgentsState>((set) => ({
    agents: [],
    isLoading: false,
    error: null,

    fetchAgents: async () => {
        set({ isLoading: true, error: null });
        try {
            const agents = await agentsService.getAgents();
            set({ agents, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur lors du chargement des agents",
                isLoading: false
            });
        }
    },

    addAgent: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const agent = await agentsService.createAgent(data);
            set((state) => ({ agents: [agent, ...state.agents], isLoading: false }));
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur lors de la création de l'agent",
                isLoading: false
            });
            throw error;
        }
    }
}));
