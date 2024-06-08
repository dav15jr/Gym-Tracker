import { useState, useEffect } from "react";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function useCheckStoredWorkouts(workoutName, userID) {
    
const [savedWorkouts, setSavedWorkouts] = useState([]);
const [workoutExists, setWorkoutExists] = useState(false);


useEffect(() => {
    fetchDataFromFirestore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workoutName, userID])
    
    async function fetchDataFromFirestore (){
        const temporaryArr = [];
    try {
        const querySnapshot = await getDocs(collection(db, userID));
        querySnapshot.forEach((doc) => {
              temporaryArr.push(doc.id);
        });
        console.log(temporaryArr);
        setSavedWorkouts(temporaryArr);
    } catch (error) {
    console.log(error);
    }
    if (temporaryArr.length > 0){  //check if a workout exists
        setWorkoutExists(true)
        console.log('Workout exists');
        console.log(userID);
        }
    }
return {workoutExists, savedWorkouts, fetchDataFromFirestore}
}

