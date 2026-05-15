import { ApiClient } from "../../../shared/api/api-client";

export interface StoreDashboardStats {
    evolution: { name: string; value: number }[];
    zones: { name: string; value: number }[];
    production_by_crop: Record<string, number>;
    total_area: number;
    total_volume: number;
    counts: {
        active_members: number;
        pending_validations: number;
        active_transports: number;
        open_alerts: number;
    };
}

const reportsService = {
    getStoreDashboardStats: async (): Promise<StoreDashboardStats> => {
        return await ApiClient.get<StoreDashboardStats>("/reports/store-dashboard-stats/");
    }
};

export default reportsService;
