import { create } from "zustand";
import type { StoreMember } from "../types/store-member";
import membersService from "../services/members.service";

interface MembersState {
    members: StoreMember[];
    isLoading: boolean;
    error: string | null;
    fetchMembers: () => Promise<void>;
    addMember: (data: Partial<StoreMember>) => Promise<void>;
    suspendMember: (id: string) => Promise<void>;
}

export const useMembersStore = create<MembersState>((set) => ({
    members: [],
    isLoading: false,
    error: null,

    fetchMembers: async () => {
        set({ isLoading: true, error: null });
        try {
            const members = await membersService.getMembers();
            set({ members, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur lors du chargement des membres",
                isLoading: false
            });
        }
    },

    addMember: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const member = await membersService.createMember(data);
            set((state) => ({ members: [member, ...state.members], isLoading: false }));
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur lors de l'ajout du membre",
                isLoading: false
            });
            throw error;
        }
    },

    suspendMember: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await membersService.suspendMember(id);
            set((state) => ({
                members: state.members.map(m => m.id === id ? { ...m, status: 'suspended' as const } : m),
                isLoading: false
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur lors de la suspension",
                isLoading: false
            });
        }
    }
}));
