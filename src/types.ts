export type ExerciseData = {
    /* Create type declaration for the form */
    exercise: string;
    type: string;
    amount: number | '';
    reps: number | '';
    sets: number | '';
    rest: number | '';
};

export type ProfileData = {
    name: string;
    age: number | '';
    sex: string;
    height: number | '';
    weightNow: number | '';
    weightGoal: number | '';
};

export type ProgressData = {
    date: string;
    weight: number | '';
};

export type AuthStateType = {
    userID: string | null;
    isLoggedIn: boolean | undefined;
    setUserID: React.Dispatch<React.SetStateAction<string | null>>;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

export type AppContextType = {
    userID: AuthStateType['userID'];
    setUserID: AuthStateType['setUserID'];
    isLoggedIn: AuthStateType['isLoggedIn'];
    setIsLoggedIn: AuthStateType['setIsLoggedIn'];
    newUser: boolean;
    setNewUser: React.Dispatch<React.SetStateAction<boolean>>;
    workoutPlan: ExerciseData[];
    setWorkoutPlan: React.Dispatch<React.SetStateAction<ExerciseData[]>>;
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    showExercises: boolean;
    setShowExercises: React.Dispatch<React.SetStateAction<boolean>>;
    workoutName: string;
    setWorkoutName: React.Dispatch<React.SetStateAction<string>>;
    showSaveBTN: boolean;
    setShowSaveBTN: React.Dispatch<React.SetStateAction<boolean>>;
    workoutChanged: boolean;
    setWorkoutChanged: React.Dispatch<React.SetStateAction<boolean>>;
    profileExists: boolean;
    setProfileExists: React.Dispatch<React.SetStateAction<boolean>>;
    profileData: ProfileData;
    setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
    userHeight: ProfileData['height'];
    setUserHeight: React.Dispatch<React.SetStateAction<ProfileData['height']>>;
    targetWeight: ProfileData['weightGoal'];
    setTargetWeight: React.Dispatch<React.SetStateAction<ProfileData['weightGoal']>>;
    fetchProfileFromFirestore: () => Promise<void>;
};
