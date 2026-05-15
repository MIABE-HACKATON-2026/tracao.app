import type { Batch } from "../../farms/types/batch";
import type { Parcel } from "../../farms/types/parcel";

export interface MarketListing {
    batch: Batch;
    parcel?: Parcel;
    farmer?: { first_name: string; last_name: string; city?: string };
    total_harvested?: number;
    blockchain_certified?: boolean;
    traceability_complete?: boolean;
}
