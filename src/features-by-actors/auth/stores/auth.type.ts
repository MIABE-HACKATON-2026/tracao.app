import type { BuyerProfile, BuyerType } from "../../buyers/types/buyer-profile";
import type { User, UserRole, UserSubRole } from "../types/user";

export interface AuthState {
    user: Partial<User>;
    buyerProfile: Partial<BuyerProfile>;

    isLoading: boolean;
    error: string | null;

    // Temporary file storage for registration flow
    files: {
        kyc_back?: any;
        kyc_front?: any;
        profile?: File;
        profilePhoto?: File | null;
        cniFront?: File | null;
        cniBack?: File | null;
        license?: File | null;
        storeDocument?: File | null;
    };

    setRole: (role: UserRole) => void;
    setSubRole: (subRole: UserSubRole) => void;
    setBuyerType: (buyerType: BuyerType) => void;
    updateUser: (data: Partial<User>) => void;
    updateBuyerProfile: (data: Partial<BuyerProfile>) => void;

    setFile: (key: keyof AuthState['files'], file: File | null) => void;

    submitRegistration: () => Promise<boolean>;

    // File upload methods
    uploadProfilePhoto: (file: File) => Promise<boolean>;
    uploadLicense: (file: File, type: 'import' | 'export') => Promise<boolean>;
    uploadKYC: (front: File, back: File) => Promise<boolean>;
    uploadStoreDocument: (storeId: string, file: File) => Promise<boolean>;
    verifyOTP: (code: string) => Promise<boolean>;
    resendOTP: () => Promise<boolean>;

    reset: () => void;

}
