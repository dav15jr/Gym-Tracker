import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../assets/AppContext';
import useCheckAuthState from '../assets/hooks/useCheckAuthState';



const ProtectedRoute = ({ children }) => {
    const { isLoggedIn} = useAppContext()
    const navigate  = useNavigate(); 
    useCheckAuthState()

useEffect(() => {
  if (isLoggedIn === false) {
    navigate("/login", { replace: true });
  } 

},[isLoggedIn, navigate]);

 // Show a loading indicator while determining auth status
 if (isLoggedIn === undefined) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;

