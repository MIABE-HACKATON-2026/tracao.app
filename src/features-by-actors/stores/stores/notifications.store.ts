import { create } from "zustand";
import type { Notification } from "../../../shared/types";
import notificationsService from "../services/notifications.service";

interface NotificationsState {
    notifications: Notification[];
    unreadCount: number;
    isLoading: boolean;
    error: string | null;
    fetchNotifications: () => Promise<void>;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,

    fetchNotifications: async () => {
        set({ isLoading: true, error: null });
        try {
            const notifications = await notificationsService.getNotifications();
            const unreadCount = notifications.filter(n => !n.read && !n.deleted).length;
            set({ notifications, unreadCount, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || "Erreur lors du chargement",
                isLoading: false
            });
        }
    },

    markAsRead: async (id) => {
        try {
            await notificationsService.markAsRead(id);
            set((state) => {
                const notifications = state.notifications.map(n =>
                    n.id === id ? { ...n, read: true } : n
                );
                return {
                    notifications,
                    unreadCount: notifications.filter(n => !n.read && !n.deleted).length,
                };
            });
        } catch (error: any) {
            console.error("Erreur markAsRead:", error);
        }
    },

    markAllAsRead: async () => {
        try {
            await notificationsService.markAllAsRead();
            set((state) => ({
                notifications: state.notifications.map(n => ({ ...n, read: true })),
                unreadCount: 0,
            }));
        } catch (error: any) {
            console.error("Erreur markAllAsRead:", error);
        }
    }
}));
