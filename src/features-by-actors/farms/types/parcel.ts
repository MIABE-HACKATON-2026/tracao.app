export interface Parcel {
    id: string;
    farmer_id: string;
    name: string;
    gps_coordinates: string; // JSON polygon
    area: number;
    status: 'draft' | 'pending' | 'approved' | 'rejected';
    validated_by?: string | null;
    created_at: string;
    updated_at: string;
}

export interface ParcelValidation {
    id: string;
    parcel_id: string;
    inspector_id: string;
    comment?: string | null;
    status: 'approved' | 'rejected';
    created_at: string;
}
