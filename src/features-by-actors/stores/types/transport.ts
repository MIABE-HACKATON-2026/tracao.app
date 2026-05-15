export interface Transport {
    id: string;
    batch: string; // Batch ID
    transporter_registry: string; // Transporter ID
    assigned_by: string;
    from_location: string;
    to_location: string;
    departure_date?: string | null;
    arrival_date?: string | null;
    status: 'pending' | 'in_progress' | 'completed';
    created_at: string;
    updated_at: string;
    batch_details?: {
        id: string;
        unique_code: string;
        crop_type: string;
        estimated_quantity: number;
    };
    transporter_registry_details?: {
        id: string;
        phone: string;
        user_details?: { first_name: string; last_name: string };
    };
}

export interface TransporterRegistry {
    id: string;
    phone: string;
    user_id?: string | null;
    created_by: string;
    status: 'invited' | 'active';
    created_at: string;
    user?: {
        id: string;
        first_name: string;
        last_name: string;
    };
}
