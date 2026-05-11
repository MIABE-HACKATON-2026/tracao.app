export interface StoreMember {
    id: string;
    store_id: string;
    user_id: string;
    role: string;
    status: 'active' | 'suspended';
    created_at: string;
}
