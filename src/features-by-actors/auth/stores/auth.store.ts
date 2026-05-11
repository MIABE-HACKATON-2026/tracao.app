import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "./auth.type";
import type { UserRole, UserSubRole } from "../types/user";
import type { BuyerType } from "../../buyers/types/buyer-profile";
import { AuthService } from "../services/auth.service";
import { useSession } from "./session.store";

const formatApiError = (error: any): string => {
    const data = error.response?.data;
    if (!data) return "Une erreur inattendue est survenue.";
    
    if (typeof data === 'string') return data;
    
    if (typeof data === 'object') {
        // Extraire les messages de validation (DRF renvoie souvent un objet avec les noms des champs)
        return Object.entries(data)
            .map(([key, value]) => {
                const fieldName = key === 'non_field_errors' ? '' : `${key}: `;
                const message = Array.isArray(value) ? value.join(' ') : value;
                return `${fieldName}${message}`;
            })
            .join(' | ');
    }
    
    return error.message || "Erreur de connexion au serveur.";
};

export const useAuth = create<AuthState>()(
    persist(
        (set, get) => ({
            user: {},
            buyerProfile: {},
            isLoading: false,
            error: null,
            files: {},

            setRole: (role: UserRole) => set((state) => ({ user: { ...state.user, role } })),
            setSubRole: (sub_role: UserSubRole) => set((state) => ({ user: { ...state.user, sub_role } })),
            setBuyerType: (buyer_type: BuyerType) => set((state) => ({ buyerProfile: { ...state.buyerProfile, buyer_type } })),

            updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),
            updateBuyerProfile: (data) => set((state) => ({ buyerProfile: { ...state.buyerProfile, ...data } })),

            setFile: (key, file) => set((state) => ({
                files: { ...state.files, [key]: file }
            })),

            submitRegistration: async () => {
                set({ isLoading: true, error: null });
                try {
                    const { user } = get();
                    await AuthService.register(user as any);
                    set({ isLoading: false });
                    return true;
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: formatApiError(error)
                    });
                    return false;
                }
            },

            uploadProfilePhoto: async (file: File) => {
                set({ isLoading: true, error: null });
                try {
                    const formData = new FormData();
                    formData.append('profile_photo', file);
                    await AuthService.updateProfile(formData);
                    set({ isLoading: false });
                    return true;
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: formatApiError(error)
                    });
                    return false;
                }
            },

            uploadLicense: async (file: File, type: 'import' | 'export') => {
                set({ isLoading: true, error: null });
                try {
                    const formData = new FormData();
                    const fieldName = type === 'import' ? 'import_license' : 'export_license';
                    formData.append(fieldName, file);
                    await AuthService.updateProfile(formData);
                    set({ isLoading: false });
                    return true;
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: formatApiError(error)
                    });
                    return false;
                }
            },

            uploadKYC: async (front: File, back: File) => {
                set({ isLoading: true, error: null });
                try {
                    const formData = new FormData();
                    formData.append('cni_front_image', front);
                    formData.append('cni_back_image', back);
                    await AuthService.submitKYC(formData);
                    set({ isLoading: false });
                    return true;
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: formatApiError(error)
                    });
                    return false;
                }
            },

            uploadStoreDocument: async (storeId: string, file: File) => {
                set({ isLoading: true, error: null });
                try {
                    const formData = new FormData();
                    formData.append('legal_document', file);
                    await AuthService.uploadStoreDocument(storeId, formData);
                    set({ isLoading: false });
                    return true;
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: formatApiError(error)
                    });
                    return false;
                }
            },

            verifyOTP: async (code: string) => {
                set({ isLoading: true, error: null });
                try {
                    const { user } = get();
                    if (!user.email) throw new Error("Email non trouvé");

                    const response = await AuthService.verifyOtp(user.email, code);

                    // On enregistre la session
                    const { setSession } = useSession.getState();
                    setSession(response.user, response.access, response.refresh);

                    set({ isLoading: false });
                    return true;
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: formatApiError(error)
                    });
                    return false;
                }
            },

            resendOTP: async () => {
                set({ isLoading: true, error: null });
                try {
                    const { user } = get();
                    if (!user.email) throw new Error("Email non trouvé");

                    await AuthService.requestOtp(user.email);
                    set({ isLoading: false });
                    return true;
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: formatApiError(error)
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
