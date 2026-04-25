import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type {JSX} from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { token } = useAuth();
    console.log('PrivateRoute token:', token);
    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;