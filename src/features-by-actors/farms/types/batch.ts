export interface Batch {
    id: string;
    farmer_id: string;
    parcel_id: string;
    season: string;
    crop_type: 'cacao' | 'café';
    estimated_quantity: number;
    status: 'draft' | 'pending' | 'approved' | 'rejected' | 'locked' | 'closed';
    unique_code: string;
    farmer_name?: string;
    validated_by?: string | null;
    created_at: string;
    updated_at: string;
}

export interface BatchValidation {
    id: string;
    batch_id: string;
    validator_id: string;
    comment?: string | null;
    status: 'approved' | 'rejected';
    created_at: string;
}
