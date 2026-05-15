export interface Store {
    id: string;
    user_id: string;
    name: string;
    legal_document?: string | null;
    status: 'pending' | 'approved' | 'rejected';
    validated_by?: string | null;
    user_details?: {
        phone: string;
        city: string;
        address: string;
    };
    phone?: string;
    location?: string;
    created_at: string;
    updated_at: string;
}
