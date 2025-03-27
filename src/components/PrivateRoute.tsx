import {Navigate, Outlet, useLocation} from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const PrivateRoute = () => {

    const { user } = useAuth();
    const location = useLocation();

    return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};