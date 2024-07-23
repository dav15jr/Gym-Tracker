import { useState, useEffect, useCallback} from "react";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function useCheckStoredWorkouts(userID) {
    
const [storedWorkouts, setStoredWorkouts] = useState([]);
const [workoutExists, setWorkoutExists] = useState(false);
const [btnDisabled, setBtnDisabled] = useState(true);

const fetchStoredWorkouts = useCallback(async () => {
    const temporaryArr = [];
    setBtnDisabled(true)
    try {
        const collRef = collection(db, userID)
        const querySnapshot = await getDocs(collRef);
       querySnapshot.forEach((doc) => {
            temporaryArr.push(doc.id);
            });
        const workouts =  temporaryArr.filter((name) => name  !== 'profileData'&& name !== 'progressHistory')  //Filter out profile & Progress Data from Stored Workouts.
        setStoredWorkouts(workouts)
        console.log(workouts.length)

        if (workouts.length > 0){  //check if a workout exists
            setWorkoutExists(true)

        } else {
            setWorkoutExists(false)

            }

    } catch (error) {
            console.log('Error fetching workouts:',error.message);
            }
}, [userID])

useEffect(() => {
   fetchStoredWorkouts();
    }, [userID, fetchStoredWorkouts])
    
return { workoutExists, storedWorkouts, fetchStoredWorkouts, btnDisabled, setBtnDisabled }
}

