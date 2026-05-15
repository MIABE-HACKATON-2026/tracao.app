import type { Batch } from "../../farms/types/batch";
import type { Parcel } from "../../farms/types/parcel";

export interface ParcelValidation {
    id: string;
    parcel_id: string;
    inspector_id: string;
    comment?: string | null;
    status: 'approved' | 'rejected';
    created_at: string;
    parcel?: Parcel & { farmer?: { first_name: string; last_name: string } };
    inspector?: { id: string; first_name: string; last_name: string };
}

export interface BatchValidation {
    id: string;
    batch_id: string;
    validator_id: string;
    comment?: string | null;
    status: 'approved' | 'rejected';
    created_at: string;
    batch?: Batch & { farmer?: { first_name: string; last_name: string } };
    validator?: { id: string; first_name: string; last_name: string };
}
