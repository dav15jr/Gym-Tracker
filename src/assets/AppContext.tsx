import { createContext, useContext, useState } from 'react';
import useCheckAuthState from './hooks/useCheckAuthState';
import useCheckStoredProfile from './hooks/useCheckStoredProfile';
// Create a context
const AppContext = createContext(null);

export function AppProvider({ children }) {
    const { userID, isLoggedIn, setUserID, setIsLoggedIn } =
        useCheckAuthState();
    const [newUser, setNewUser] = useState<boolean>(false);
    const [workoutPlan, setWorkoutPlan] = useState([]);
    const [userName, setUserName] = useState<string>('');
    const [showExercises, setShowExercises] = useState<boolean>(false);
    const [workoutName, setWorkoutName] = useState<string>('');
    const [showSaveBTN, setShowSaveBTN] = useState<boolean>(false);
    const [workoutChanged, setWorkoutChanged] = useState<boolean>(false);
    const [userHeight, setUserHeight] = useState<number>(0);
    const [targetWeight, setTargetWeight] = useState<number>(0);
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
