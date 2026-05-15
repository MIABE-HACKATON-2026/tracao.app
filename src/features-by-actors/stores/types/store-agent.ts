export interface StoreAgent {
    id: string;
    store_id: string;
    user_id: string;
    role: 'inspecteur' | 'agent_terrain';
    status: 'active' | 'suspended';
    created_at: string;
    updated_at: string;
    user?: {
        id: string;
        first_name: string;
        last_name: string;
        phone: string;
        email: string;
    };
}
