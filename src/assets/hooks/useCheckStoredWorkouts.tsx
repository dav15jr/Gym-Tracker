import { useState, useEffect } from "react";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function useCheckStoredWorkouts(userID, workoutName ) {
    
const [savedWorkouts, setSavedWorkouts] = useState([]);
const [workoutExists, setWorkoutExists] = useState(false);


useEffect(() => {
    fetchStoredWorkouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userID, workoutName ])
    
    async function fetchStoredWorkouts (){
        const temporaryArr = [];
        try {
            const querySnapshot = await getDocs(collection(db, userID));
            querySnapshot.forEach((doc) => {
                temporaryArr.push(doc.id);
                });
            setSavedWorkouts(temporaryArr.filter((name) => name  !== 'profileData'))  //Filter out profile Data from Stored Workouts.
            console.log(temporaryArr);
        } catch (error) {
        console.log(error);
        }
    if (temporaryArr.length > 1){  //check if a workout exists
        setWorkoutExists(true)
        console.log(temporaryArr);
        console.log('Workout exists');
        }
        console.log(userID);
    }
return {workoutExists, savedWorkouts, fetchStoredWorkouts}
}

