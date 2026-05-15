import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../../features-by-actors/auth/stores/session.store";

export const AuthGuard: React.FC = () => {
    const { isAuthenticated } = useSession();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

interface RoleGuardProps {
    allowedRoles: string[];
    allowedSubRoles?: string[];
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, allowedSubRoles }) => {
    const { user } = useSession();

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/login" replace />;
    }

    if (allowedSubRoles && allowedSubRoles.length > 0) {
        if (!user.sub_role || !allowedSubRoles.includes(user.sub_role)) {
            return <Navigate to="/login" replace />;
        }
    }

    return <Outlet />;
};
