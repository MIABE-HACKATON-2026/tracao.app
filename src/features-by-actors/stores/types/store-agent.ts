export interface StoreAgent {
    id: string;
    cooperative_id: string;
    user_id: string;
    role: 'inspecteur' | 'agent_terrain';
    status: 'active' | 'suspended';
    created_at: string;
}
