import type { BuyerProfile, BuyerType } from "../../buyers/types/buyer-profile";
import type { User, UserRole, UserSubRole } from "../types/user";

export interface AuthState {
    user: Partial<User>;
    buyerProfile: Partial<BuyerProfile>;

    setRole: (role: UserRole) => void;
    setSubRole: (subRole: UserSubRole) => void;
    setBuyerType: (buyerType: BuyerType) => void;
    updateUser: (data: Partial<User>) => void;
    updateBuyerProfile: (data: Partial<BuyerProfile>) => void;
    reset: () => void;
}
