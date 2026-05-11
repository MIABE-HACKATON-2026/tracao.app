import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "./auth.type";
import type { UserRole, UserSubRole } from "../types/user";
import type { BuyerType } from "../../buyers/types/buyer-profile";
import { AuthService } from "../services/auth.service";

export const useAuth = create<AuthState>()(
    persist(
        (set, get) => ({
            user: {},
            buyerProfile: {},
            isLoading: false,
            error: null,

            setRole: (role: UserRole) => set((state) => ({ user: { ...state.user, role } })),
            setSubRole: (sub_role: UserSubRole) => set((state) => ({ user: { ...state.user, sub_role } })),
            setBuyerType: (buyer_type: BuyerType) => set((state) => ({ buyerProfile: { ...state.buyerProfile, buyer_type } })),
            
            updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),
            updateBuyerProfile: (data) => set((state) => ({ buyerProfile: { ...state.buyerProfile, ...data } })),
            
            submitRegistration: async () => {
                set({ isLoading: true, error: null });
                try {
                    const { user } = get();
                    // We cast as any here because RegisterRequest expects specific fields
                    // but our partial user should have them collected by now.
                    await AuthService.register(user as any);
                    set({ isLoading: false });
                    return true;
                } catch (error: any) {
                    set({ 
                        isLoading: false, 
                        error: error.response?.data?.message || "Une erreur est survenue lors de l'inscription." 
                    });
                    return false;
                }
            },

            reset: () => set({ user: {}, buyerProfile: {}, isLoading: false, error: null }),
        }),
        {
            name: "tracao-registration-flow",
        }
    )
);
