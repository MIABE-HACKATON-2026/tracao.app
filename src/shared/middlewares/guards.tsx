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
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles }) => {
    const { user } = useSession();

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
