import { formatWeight, formatDate } from "../../../shared/utils/formatters";

/**
 * Validate if a harvest quantity is within estimated bounds (+20% rule)
 */
export const validateHarvestQuantity = (quantity: number, estimated: number): boolean => {
    return quantity <= estimated * 1.2;
};

/**
 * Get color for batch status
 */
export const getBatchStatusColor = (status: string): string => {
    const map: Record<string, string> = {
        draft: "#9CA3AF",
        pending: "#F59E0B",
        approved: "#10B981",
        rejected: "#EF4444",
        locked: "#6B7280",
        closed: "#1F2937"
    };
    return map[status] || "#9CA3AF";
};
