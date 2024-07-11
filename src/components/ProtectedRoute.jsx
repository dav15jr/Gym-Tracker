import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../assets/AuthContext';
// import { useAppContext } from '../assets/AppContext';
import useCheckAuthState from '../assets/hooks/useCheckAuthState';



const ProtectedRoute = ({ children }) => {
    //   const { isLoggedIn } = useAuth();
    
    const { isLoggedIn} = useCheckAuthState()
    const navigate  = useNavigate(); 
    console.log('Protected Route isLoggedIn is', isLoggedIn)
    // useCheckAuthState()

useEffect(() => {
  if (!isLoggedIn) {
    navigate("/login", { replace: true });
    console.log('Protected Route isLoggedIn is', isLoggedIn)
  }
},[isLoggedIn, navigate]);

  return children;
};

export default ProtectedRoute;

// import { Outlet ,useNavigate } from "react-router-dom";
// import useCheckAuthState from '../assets/hooks/useCheckAuthState';

// const ProtectedRoute = () => {
//     const navigate  = useNavigate(); 
//     const { isLoggedIn} = useCheckAuthState()

//     return  isLoggedIn ? <Outlet /> : navigate("/login", { replace: true });
//     }

//     export default ProtectedRoute;
