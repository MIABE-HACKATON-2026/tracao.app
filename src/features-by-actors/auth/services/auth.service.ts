import { ApiClient } from '../../../shared/api/api-client';
import type {
    LoginRequest,
    TokenResponse,
    RegisterRequest,
    AuthProfileResponse
} from '../types/auth-api.type';
import type { User } from '../types/user';
import type { KycRecord } from '../types/kyc-record';

export const AuthService = {
    /**
     * Authenticate a user and get JWT tokens
     */
    login: async (credentials: LoginRequest): Promise<TokenResponse> => {
        return ApiClient.post<TokenResponse>('/auth/login/', credentials);
    },

    /**
     * Register a new user
     * Returns the created User object (without tokens, usually requires login after)
     */
    register: async (userData: RegisterRequest): Promise<User> => {
        return ApiClient.post<User>('/auth/register/', userData);
    },

    /**
     * Fetch the authenticated user's profile
     */
    getProfile: async (): Promise<AuthProfileResponse> => {
        return ApiClient.get<AuthProfileResponse>('/auth/profile/');
    },

    /**
     * Update user profile (used for profile photo upload)
     */
    updateProfile: async (formData: FormData): Promise<AuthProfileResponse> => {
        return ApiClient.patch<AuthProfileResponse>('/auth/profile/', formData);
    },

    /**
     * Submit KYC documents (CNI front/back)
     */
    submitKYC: async (formData: FormData): Promise<KycRecord> => {
        return ApiClient.post<KycRecord>('/auth/kyc/', formData);
    },

    uploadStoreDocument: async (storeId: string, formData: FormData): Promise<any> => {
        return ApiClient.patch<any>(`/stores/${storeId}/`, formData);
    },

    /**
     * Verify OTP code for account registration
     */
    verifyOtp: async (email: string, code: string): Promise<any> => {
        return ApiClient.post<any>('/auth/verify-otp/', { email, code });
    },

    /**
     * Request a new OTP code
     */
    requestOtp: async (email: string): Promise<any> => {
        return ApiClient.post<any>('/auth/send-otp/', { email });
    }
};
