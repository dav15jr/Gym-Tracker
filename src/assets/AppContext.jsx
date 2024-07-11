import React, { createContext, useContext, useState } from 'react';
import useCheckStoredProgress from '../assets/hooks/useCheckStoredProgress';
import useCheckAuthState from '../assets/hooks/useCheckAuthState';

// Create a context
const AppContext = createContext();


export function AppProvider({ children }) {
  
  const {userID, isLoggedIn,setUserID, setIsLoggedIn} = useCheckAuthState()
  const [userHeight, setUserHeight] = useState();
  const [targetWeight, setTargetWeight] = useState();
  const [newUser, setNewUser] = useState(false);
  const {progressHistory, setProgressHistory, bmiHistory, setBmiHistory, fetchProgressHistory} = useCheckStoredProgress(userID)


  // useCheckAuthState()

  return (
    <AppContext.Provider
      value={{ userID, setUserID, userHeight, setUserHeight, targetWeight, setTargetWeight, isLoggedIn, setIsLoggedIn, newUser, setNewUser, progressHistory, setProgressHistory, bmiHistory, setBmiHistory, fetchProgressHistory}}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the AppContext
export function useAppContext() {
  return useContext(AppContext);
}
