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
                    // Le backend retourne { access, refresh, user } en une seule réponse
                    const response = await AuthService.login({ email, password });
                    const { access, refresh, user } = response;

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
                    const data = err?.response?.data;
                    const message =
                        data?.non_field_errors?.[0] ||
                        data?.detail ||
                        data?.message ||
                        data?.error ||
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
