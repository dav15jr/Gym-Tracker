import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { ProfileData } from '../../types';

const defaultProfile: ProfileData = {
    name: '',
    age: null,
    sex: 'male',
    height: null,
    weightNow: null,
    weightGoal: null,
};

export default function useCheckStoredProfile(
    userID,
    setUserName,
    setShowExercises
) {
    const [profileData, setProfileData] = useState<ProfileData>(defaultProfile);
    const [profileExists, setProfileExists] = useState<boolean>(false);

    const fetchProfileFromFirestore = useCallback(async () => {
        try {
            const docRef = doc(db, userID, 'profileData');
            const docSnap = await getDoc(docRef);
            const profData = docSnap.data();
            setProfileData(profData.profileData);
            setUserName(profData.profileData.name);
            setProfileExists(true);
            setShowExercises(true);
        } catch (error) {
            console.log('Error fetching profile data', error.message);
        }
    }, [setShowExercises, setUserName, userID]);

    useEffect(() => {
        if (userID) {
            fetchProfileFromFirestore();
        }
    }, [userID, fetchProfileFromFirestore]);

    return {
        profileExists,
        setProfileExists,
        profileData,
        setProfileData,
        fetchProfileFromFirestore,
    };
}
