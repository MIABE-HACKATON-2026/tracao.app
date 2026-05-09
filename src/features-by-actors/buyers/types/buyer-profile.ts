export type BuyerType = 'individual' | 'company' | 'institution';

export interface BuyerProfile {
    id: string;
    user_id: string;
    buyer_type: BuyerType;
    company_name?: string | null;
    registration_number?: string | null;
    tax_id?: string | null;
    business_address?: string | null;
    country_of_operation?: string | null;
    import_license?: string | null;
    export_license?: string | null;
    certification?: string | null;
    contact_person_name?: string | null;
    contact_person_phone?: string | null;
    website?: string | null;
    verified: boolean;
    created_at: string;
}
