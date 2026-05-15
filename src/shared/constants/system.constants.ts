export const CROP_TYPES = {
    CACAO: "cacao",
    CAFE: "café",
} as const;

export const BATCH_STATUS = {
    DRAFT: "draft",
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
    LOCKED: "locked",
    CLOSED: "closed",
} as const;

export const PARCEL_STATUS = {
    DRAFT: "draft",
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
} as const;

export const TRANSACTION_STATUS = {
    PENDING: "pending",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
} as const;
