import React, { createContext, useContext, useEffect } from 'react';
// import { useAppContext } from '../assets/AppContext';
import useCheckAuthState from '../assets/hooks/useCheckAuthState';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate  = useNavigate(); 
    const { isLoggedIn} = useCheckAuthState()
    // const { isLoggedIn } = useAppContext();
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // useCheckAuthState()

    useEffect(() => {
          if (isLoggedIn) {
            navigate('/home'); // Redirect to home page if logged in
          }
      }, [isLoggedIn, navigate]);

    console.log('Auth Context isLoggedIn is', isLoggedIn)
  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);