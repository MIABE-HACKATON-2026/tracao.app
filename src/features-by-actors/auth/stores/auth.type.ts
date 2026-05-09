import type { BuyerProfile, BuyerType } from "../../buyers/types/buyer-profile";
import type { User, UserRole, UserSubRole } from "../types/user";

export interface AuthState {
    user: User,
    buyerProfile: BuyerProfile

    setRole: (role: UserRole) => void
    setSubRole: (subRole: UserSubRole) => void
    setBuyerType: (buyerType: BuyerType) => void

}