export interface KycRecord {
    id: string;
    user_id: string;
    cni_front_image: string;
    cni_back_image: string;
    status: 'pending' | 'approved' | 'rejected';
    rejection_reason?: string | null;
    submitted_at: string;
    validated_at?: string | null;
    validated_by?: string | null;
}
