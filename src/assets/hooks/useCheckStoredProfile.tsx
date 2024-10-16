import { useState, useEffect, useCallback } from "react";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { ProfileData } from '../../types';


const defaultProfile:ProfileData = {
    name: '',
    age: '',
    sex:'male',
    height:'',
    weightNow:'',
    weightGoal:'',
    };

export default function useCheckStoredProfile(userID, setUserName, setShowExercises) {

    const [profileData, setProfileData] = useState(defaultProfile);
    const [profileExists, setProfileExists] = useState(false);
    
    const fetchProfileFromFirestore = useCallback(async () =>{
        try {
            const docRef = doc(db, userID, 'profileData');
            const docSnap = await getDoc(docRef);
            const profData = docSnap.data()
            setProfileData(profData.profileData)
            setUserName(profData.profileData.name)
            setProfileExists(true)
            setShowExercises(true)
        } catch (error) {
        console.log('Error fetching profile data', error.message )
        }
    },[setShowExercises, setUserName, userID])
  
    useEffect(() => {
        fetchProfileFromFirestore();
        }, [userID, fetchProfileFromFirestore])


return {profileExists, setProfileExists, profileData, setProfileData, fetchProfileFromFirestore}
}

