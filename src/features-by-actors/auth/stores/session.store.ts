import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/user';
import { AuthService } from '../services/auth.service';

interface SessionState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    login: (email: string, password: string) => Promise<boolean>;
    setSession: (user: User, accessToken: string, refreshToken: string) => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
    clearError: () => void;
    logout: () => void;
}

export const useSession = create<SessionState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    // 1. Obtenir les tokens JWT
                    const { access, refresh } = await AuthService.login({ email, password });

                    // 2. Stocker les tokens pour que l'intercepteur Axios les utilise
                    set({ accessToken: access, refreshToken: refresh });

                    // 3. Récupérer le profil complet de l'utilisateur
                    const user = await AuthService.getProfile();

                    // 4. Sauvegarder la session complète
                    set({
                        user,
                        accessToken: access,
                        refreshToken: refresh,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });

                    return true;
                } catch (err: any) {
                    const message =
                        err?.response?.data?.detail ||
                        err?.response?.data?.message ||
                        'Identifiants incorrects. Veuillez réessayer.';
                    set({ isLoading: false, error: message, isAuthenticated: false });
                    return false;
                }
            },

            setSession: (user, accessToken, refreshToken) => set({
                user,
                accessToken,
                refreshToken,
                isAuthenticated: true,
            }),

            setTokens: (accessToken, refreshToken) => set({
                accessToken,
                refreshToken,
            }),

            clearError: () => set({ error: null }),

            logout: () => set({
                user: null,
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
                error: null,
            }),
        }),
        {
            name: 'tracao-session',
        }
    )
);
