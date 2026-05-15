export interface BuyerProfile {
    id: string;
    company_name: string;
    registration_number: string;
    kyc_status: "pending" | "approved" | "rejected";
    contact_email: string;
    contact_phone: string;
}

export interface MarketplaceOffer {
    id: string;
    batch_id: string;
    price: number;
    quantity: number;
    crop_type: "cacao" | "café";
    status: "available" | "sold" | "reserved";
    created_at: string;
}
