import { ApiClient } from "../../../shared/api/api-client";
import type { StoreMember } from "../types/store-member";

class MembersService {
    async getMembers(): Promise<StoreMember[]> {
        return await ApiClient.get<StoreMember[]>("/store-members/");
    }

    async getMember(id: string): Promise<StoreMember> {
        return await ApiClient.get<StoreMember>(`/store-members/${id}/`);
    }

    async createMember(data: Partial<StoreMember>): Promise<StoreMember> {
        return await ApiClient.post<StoreMember>("/store-members/", data);
    }

    async updateMember(id: string, data: Partial<StoreMember>): Promise<StoreMember> {
        return await ApiClient.patch<StoreMember>(`/store-members/${id}/`, data);
    }

    async deleteMember(id: string): Promise<void> {
        await ApiClient.delete(`/store-members/${id}/`);
    }

    async suspendMember(id: string): Promise<StoreMember> {
        return await ApiClient.post<StoreMember>(`/store-members/${id}/suspend/`);
    }
}

export default new MembersService();
