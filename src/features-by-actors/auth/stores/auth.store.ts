import { create } from "zustand";
import type { AuthState } from "./auth.type";
import type { UserRole, UserSubRole } from "../types/user";
import type { BuyerType } from "../../buyers/types/buyer-profile";

export const useAuth = create<AuthState>((set) => ({
    user: {},
    buyerProfile: {},

    setRole: (role: UserRole) => set((state) => ({ user: { ...state.user, role } })),
    setSubRole: (sub_role: UserSubRole) => set((state) => ({ user: { ...state.user, sub_role } })),
    setBuyerType: (buyer_type: BuyerType) => set((state) => ({ buyerProfile: { ...state.buyerProfile, buyer_type } })),
    
    updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),
    updateBuyerProfile: (data) => set((state) => ({ buyerProfile: { ...state.buyerProfile, ...data } })),
    
    reset: () => set({ user: {}, buyerProfile: {} }),
}));
