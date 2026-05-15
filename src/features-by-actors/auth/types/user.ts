export type UserRole = 'farmer' | 'buyer' | 'store' | 'admin' | 'agent' | 'transporter' | 'processor';
export type UserSubRole = 'exportateur' | 'importateur' | 'transformateur' | 'inspector'| 'gouvernement'| 'certificateur'| 'agent' | 'transporter' | 'processor';
export type UserStatus = 'active' | 'suspended' | 'pending';
export type KycStatus = 'pending' | 'approved' | 'rejected';

export interface User {
    id: string;
    role: UserRole;
    sub_role?: UserSubRole | null;
    first_name: string;
    last_name: string;
    email?: string | null;
    phone: string;
    password?: string | null;
    profile_photo?: string | null;
    country?: string | null;
    city?: string | null;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    status: UserStatus;
    kyc_status: KycStatus;
    created_at: string;
    updated_at: string;
}