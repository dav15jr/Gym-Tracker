import { useState, useEffect } from "react";

export default function useCheckStoredWorkouts(storage) {
    

const [savedWorkouts, setSavedWorkouts] = useState([]);
const [workoutExists, setWorkoutExists] = useState(false);

useEffect(() => {
    const workouts = Object.entries(localStorage) 
        if (workouts.length > 1){  //check if a workout exists - not including the 'debug' hence using > 1 not > 0
            setWorkoutExists(true)
        }
        storedWorkouts();
},[storage])  

const storedWorkouts = () => {
    const storedNames = Object.keys(localStorage);
    setSavedWorkouts(storedNames.filter((name) => name !== 'debug')) // filter out the 'debug' entry in local storage    
    }

return {workoutExists, savedWorkouts, storedWorkouts}
}

