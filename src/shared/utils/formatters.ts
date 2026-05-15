/**
 * Format numbers as weight (e.g., 1000 -> 1 000 kg)
 */
export const formatWeight = (amount: number, unit = "kg"): string => {
    return new Intl.NumberFormat("fr-FR").format(amount) + " " + unit;
};

/**
 * Format currency (e.g., 5000 -> 5 000 FCFA)
 */
export const formatCurrency = (amount: number, currency = "FCFA"): string => {
    return new Intl.NumberFormat("fr-FR").format(amount) + " " + currency;
};

/**
 * Format date to readable string
 */
export const formatDate = (date: string | Date): string => {
    return new Date(date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

/**
 * Calculate area from GPS coordinates (simplified for polygon display)
 */
export const calculateDisplayArea = (coordinates: any[]): string => {
    if (!coordinates || coordinates.length < 3) return "0 ha";
    // Mock calculation for display if not provided by backend
    return "0.0 ha";
};
