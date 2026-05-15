export interface BuyerProfile {
    id: string;
    user_id: string;
    buyer_type?: 'individual' | 'company' | 'institution';
    company_name?: string;
    registration_number?: string;
    tax_id?: string;
    export_license?: string | null;
    import_license?: string | null;
    country_of_operation?: string;
    business_address?: string;
    certification?: string;
    created_at: string;
    updated_at: string;
}

export type BuyerType = 'individual' | 'company' | 'institution';
