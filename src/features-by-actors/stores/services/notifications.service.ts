import { ApiClient } from "../../../shared/api/api-client";
import type { Notification } from "../../../shared/types";

class NotificationsService {
    async getNotifications(): Promise<Notification[]> {
        return await ApiClient.get<Notification[]>("/notifications/");
    }

    async markAsRead(id: string): Promise<void> {
        await ApiClient.post(`/notifications/${id}/mark-read/`);
    }

    async markAllAsRead(): Promise<void> {
        const notifs = await this.getNotifications();
        await Promise.all(
            notifs.filter(n => !n.read).map(n => this.markAsRead(n.id))
        );
    }
}

export default new NotificationsService();
