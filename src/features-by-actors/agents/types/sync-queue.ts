export interface SyncQueue {
    id: string;
    agent_id: string;
    action_type: 'create_farmer' | 'create_parcel' | 'create_batch' | 'harvest' | 'kyc_capture';
    payload: any; // JSON payload
    local_id: string;
    status: 'pending' | 'synced' | 'conflict' | 'failed';
    conflict_reason?: string | null;
    created_locally_at: string;
    synced_at?: string | null;
    created_at: string;
}
