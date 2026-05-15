import { ApiClient } from "../../../shared/api/api-client";

export interface Transporter {
    id: string;
    phone: string;
    status: string;
    user_details?: {
        first_name: string;
        last_name: string;
        email: string;
    }
    created_at: string;
}

class TransportersService {
    async getTransporters(): Promise<Transporter[]> {
        return await ApiClient.get<Transporter[]>("/transporters/");
    }

    async inviteTransporter(data: { email: string; phone?: string; role: 'transporter'; sub_role?: string }): Promise<any> {
        return await ApiClient.post("/auth/invite-operator/", data);
    }
}

export default new TransportersService();
