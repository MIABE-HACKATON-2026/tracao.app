export interface User {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: "admin" | "farmer" | "store" | "agent" | "transporter" | "processor" | "buyer";
    sub_role?: "exportateur" | "importateur" | "transformateur" | "inspector" | "super_admin" | "gouvernement" | "certificateur";
    phone?: string;
    city?: string;
    country?: string;
    is_active: boolean;
    status: "active" | "suspended" | "pending";
    kyc_status: "pending" | "approved" | "rejected";
    date_joined: string;
    created_at: string;
}

export interface SystemStats {
    total_users: number;
    total_batches: number;
    total_parcels: number;
    total_transactions: number;
}
