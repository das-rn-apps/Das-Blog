// frontend/src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface PrivateRouteProps {
    adminOnly?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ adminOnly = false }) => {

    const userInfo = useAuthStore((state) => state.userInfo);
    const loading = useAuthStore((state) => state.loading);

    if (loading) {
        return null;
    }

    if (!userInfo) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !userInfo.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;