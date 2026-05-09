export interface Session {
    id: string;
    user_id: string;
    device_id?: string | null;
    ip_address?: string | null;
    is_active: boolean;
    created_at: string;
    expires_at: string;
}
