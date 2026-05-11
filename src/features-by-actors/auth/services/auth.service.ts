import { ApiClient } from '../../../shared/api/api-client';
import type { 
    LoginRequest, 
    TokenResponse, 
    RegisterRequest, 
    AuthProfileResponse 
} from '../types/auth-api.type';
import type { User } from '../types/user';

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
    }
};
