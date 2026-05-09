export interface TransporterRegistry {
    id: string;
    phone: string;
    user_id?: string | null;
    created_by: string;
    status: 'invited' | 'active';
    created_at: string;
}

export interface Transport {
    id: string;
    batch_id: string;
    transporter_registry_id: string;
    assigned_by: string;
    from_location: string;
    to_location: string;
    departure_date?: string | null;
    arrival_date?: string | null;
    status: 'pending' | 'in_progress' | 'completed';
    created_at: string;
}
