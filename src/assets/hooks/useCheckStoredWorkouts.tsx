import { useState, useEffect, useCallback} from "react";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function useCheckStoredWorkouts(userID) {
    
const [storedWorkouts, setStoredWorkouts] = useState([]);
const [workoutExists, setWorkoutExists] = useState(false);

const fetchStoredWorkouts = useCallback(async () => {
    const temporaryArr = [];
    try {
        const collRef = collection(db, userID)
        const querySnapshot = await getDocs(collRef);
       querySnapshot.forEach((doc) => {
            temporaryArr.push(doc.id);
            });
        const workouts =  temporaryArr.filter((name) => name  !== 'profileData')  //Filter out profile Data from Stored Workouts.
        setStoredWorkouts(workouts)
        console.log(workouts.length)

        if (workouts.length > 0){  //check if a workout exists
            setWorkoutExists(true)
        } else {
            setWorkoutExists(false)
            }

    } catch (error) {
            console.log(error.message);
            }
    console.log('Checked workouts page rendered')
}, [userID])

useEffect(() => {
   fetchStoredWorkouts();
    }, [userID, fetchStoredWorkouts])
    
return { workoutExists, storedWorkouts, fetchStoredWorkouts }
}

