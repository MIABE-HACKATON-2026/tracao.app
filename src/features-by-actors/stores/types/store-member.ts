export interface StoreMember {
    id: string;
    store_id: string;
    user_id: string;
    role: string;
    status: 'active' | 'suspended';
    created_at: string;
    updated_at: string;
    user?: {
        id: string;
        first_name: string;
        last_name: string;
        phone: string;
        email: string;
        kyc_status: string;
    };
}
