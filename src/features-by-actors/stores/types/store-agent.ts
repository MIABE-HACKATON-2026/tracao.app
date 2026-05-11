export interface StoreAgent {
    id: string;
    store_id: string;
    user_id: string;
    role: 'inspecteur' | 'agent_terrain';
    status: 'active' | 'suspended';
    created_at: string;
}
