import { useState, useEffect, useCallback } from "react";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { ProfileData } from '../../types';


const defaultProfile:ProfileData = {
    name: 'John Snow',
    age: 28,
    sex:'male',
    height:170,
    weight:80,
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
            console.log('Check profile func rendered')
        } catch (error) {
        console.log('Can not fetch profile data')
        }
    },[setShowExercises, setUserName, userID])
  
    useEffect(() => {
        fetchProfileFromFirestore();
        console.log('Check profile rendered')
        }, [userID, fetchProfileFromFirestore])
    
        console.log('Check profile page rendered')

return {profileExists, setProfileExists, profileData, setProfileData, fetchProfileFromFirestore}
}

