import { createContext, useContext, useState } from 'react';
import useCheckAuthState from '../assets/hooks/useCheckAuthState';
import useCheckStoredProfile from '../assets/hooks/useCheckStoredProfile';
// Create a context
const AppContext = createContext();

export function AppProvider({ children }) {
    const { userID, isLoggedIn, setUserID, setIsLoggedIn } =
        useCheckAuthState();
    const [newUser, setNewUser] = useState(false);
    const [workoutPlan, setWorkoutPlan] = useState([]);
    const [userName, setUserName] = useState('');
    const [showExercises, setShowExercises] = useState(false);
    const [workoutName, setWorkoutName] = useState('');
    const [showSaveBTN, setShowSaveBTN] = useState(false);
    const [workoutChanged, setWorkoutChanged] = useState(false);
    const [userHeight, setUserHeight] = useState(0);
    const [targetWeight, setTargetWeight] = useState(0);
    const {
        profileExists,
        setProfileExists,
        profileData,
        setProfileData,
        fetchProfileFromFirestore,
    } = useCheckStoredProfile(userID, setUserName, setShowExercises);

    useCheckAuthState();

    return (
        <AppContext.Provider
            value={{
                userID,
                setUserID,
                isLoggedIn,
                setIsLoggedIn,
                newUser,
                setNewUser,
                workoutPlan,
                setWorkoutPlan,
                userName,
                setUserName,
                showExercises,
                setShowExercises,
                workoutName,
                setWorkoutName,
                showSaveBTN,
                setShowSaveBTN,
                workoutChanged,
                setWorkoutChanged,
                profileExists,
                setProfileExists,
                profileData,
                setProfileData,
                userHeight,
                setUserHeight,
                targetWeight,
                setTargetWeight,
                fetchProfileFromFirestore,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

// Custom hook to use the AppContext
// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
    return useContext(AppContext);
}
