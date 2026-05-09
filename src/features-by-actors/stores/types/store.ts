export interface Store {
    id: string;
    user_id: string;
    name: string;
    legal_document?: string | null;
    status: 'pending' | 'approved' | 'rejected';
    validated_by?: string | null;
    created_at: string;
}
