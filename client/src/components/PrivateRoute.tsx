// frontend/src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
    adminOnly?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ adminOnly = false }) => {
    const { userInfo, loading } = useAuth();

    if (loading) {
        // You might want a spinner here or just render nothing until auth state is known
        return null;
    }

    if (!userInfo) {
        // Not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !userInfo.isAdmin) {
        // Logged in but not an admin, redirect to home or unauthorized page
        return <Navigate to="/" replace />;
    }

    // User is logged in and, if applicable, is an admin
    return <Outlet />;
};

export default PrivateRoute;