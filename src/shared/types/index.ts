export interface Transaction {
    id: string;
    batch_id: string;
    buyer_id: string;
    seller_id: string;
    quantity: number;
    price: number;
    status: 'pending' | 'completed' | 'cancelled';
    created_at: string;
    updated_at: string;
}

export interface OperatorAssignment {
    id: string;
    operator_id: string;
    assigned_by: string;
    operator_type: 'transporteur' | 'transformateur';
    transport_id?: string | null;
    transformation_id?: string | null;
    created_at: string;
}

export interface TraceabilityLog {
    id: string;
    batch_id: string;
    action_type: 'create' | 'validate' | 'reject' | 'harvest' | 'transport' | 'transform' | 'sell' | 'fraud_alert' | 'field_activity';
    performed_by: string;
    metadata?: any | null; // JSON metadata
    created_at: string;
}

export interface QrCode {
    id: string;
    batch_id: string;
    qr_data: string;
    created_at: string;
}

export interface BlockchainRecord {
    id: string;
    entity_type: 'batch' | 'validation' | 'transaction' | 'transformation' | 'transport';
    entity_id: string;
    hash: string;
    tx_hash?: string | null;
    chain?: string | null;
    block_number?: number | null;
    anchored_at?: string | null;
    created_at: string;
}

export interface FraudAlert {
    id: string;
    user_id: string;
    batch_id?: string | null;
    parcel_id?: string | null;
    type: 'gps_conflict' | 'duplicate' | 'anomaly' | 'multi_account' | 'production_excess' | 'transport_anomaly' | 'transformation_anomaly';
    score: number;
    status: 'open' | 'resolved' | 'dismissed';
    resolution_comment?: string | null;
    resolved_by?: string | null;
    resolved_at?: string | null;
    created_at: string;
}

export interface Notification {
    id: string;
    user_id: string;
    type: 'validation' | 'rejection' | 'transaction' | 'transport' | 'fraud' | 'transformation' | 'security' | 'system';
    message: string;
    read: boolean;
    deleted: boolean;
    created_at: string;
}
