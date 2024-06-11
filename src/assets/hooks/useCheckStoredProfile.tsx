import { useState, useEffect } from "react";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { ProfileData } from '../../types';

const defaultProfile:ProfileData = {
    name: 'John',
    age: 18,
    sex:'male',
    weight:80,
};
export default function useCheckStoredProfile(userID, setUserName) {

    const [profileData, setProfileData] = useState(defaultProfile);
    const [profileExists, setProfileExists] = useState(false);
  

    useEffect(() => {
        fetchProfileFromFirestore();
        console.log('Check profile rendered')
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [userID])
    
    async function fetchProfileFromFirestore (){
        try {
            const docRef = doc(db, userID, 'profileData');
            const docSnap = await getDoc(docRef);
            const profData = docSnap.data()
            
            console.log(profData.profileData)
            setProfileData(profData.profileData)
            setUserName(profData.profileData.name)
            setProfileExists(true)
        } catch (error) {
        console.log('Can not fetch profile data')
        }
    }

            console.log('profile page rendered')

return {profileExists, setProfileExists, profileData, setProfileData, fetchProfileFromFirestore}
}

