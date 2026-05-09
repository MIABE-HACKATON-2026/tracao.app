export interface StoreMember {
    id: string;
    cooperative_id: string; // Kept as cooperative_id in DB schema, though entity is Store
    user_id: string;
    role: string;
    status: 'active' | 'suspended';
    created_at: string;
}
