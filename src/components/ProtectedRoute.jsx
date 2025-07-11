import { Navigate } from 'react-router-dom';
import { useAppContext } from '../assets/AppContext';
import useCheckAuthState from '../assets/hooks/useCheckAuthState';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAppContext();
    useCheckAuthState(); // Custom hook to check authentication state

    // Show a loading indicator while determining auth status
    if (isLoggedIn === undefined) {
        return <div>Loading...</div>;
    }
    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;
