import type { User } from './user';

export interface LoginRequest {
    email: string;
    password?: string;
}

export interface TokenResponse {
    access: string;
    refresh: string;
}

export interface RegisterRequest {
    phone: string;
    first_name: string;
    last_name: string;
    email?: string | null;
    role: string;
    password?: string;
}

export interface AuthProfileResponse extends User {}
