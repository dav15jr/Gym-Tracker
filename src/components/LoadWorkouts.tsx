import { useState} from 'react';
import { doc, getDoc, deleteDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";
import useCheckStoredWorkouts from '../assets/hooks/useCheckStoredWorkouts'; 

export default function LoadWorkouts({userID, setWorkoutPlan, setWorkoutName, setShowWorkoutTitle, setShowSaveBTN}){


 const [loadedWorkout, setLoadedWorkout] = useState();
 const { workoutExists, storedWorkouts, fetchStoredWorkouts} = useCheckStoredWorkouts(userID );
    
//------------------------------Load Workout--------------------
useCheckStoredWorkouts(userID); 

// console.log('User ID on Loads page', userID);

const handleLoadSelect =(e) => {
    setLoadedWorkout(e.target.value)
    console.log(loadedWorkout)
    }

const loadWorkout = () => {
    if(loadedWorkout == 'default'){    //check if the current workout already exists
        alert('Please select a Workout')
        } 
    else{
        const fetchWorkoutData = async () => {
            try {
                const docRef = doc(db, userID, loadedWorkout);
                const docSnap = await getDoc(docRef);
                const tempArr = [];

                const workData = docSnap.data()
                workData.workoutPlan.forEach((doc) => {
                tempArr.push(doc);
                });
                setWorkoutPlan(tempArr)
            } catch (error) {
            console.log(error)
            }
             };
            fetchWorkoutData()
            setShowWorkoutTitle(true)
            setWorkoutName(loadedWorkout)
            setShowSaveBTN(false)
    }
} 
//------------------------------Delete Workout--------------------
const delWorkout = () => {
    deleteDoc(doc(db, userID, loadedWorkout)); //delete workout from Firestore DB
    fetchStoredWorkouts();   //Fetch fresh data from Firestore DB
}

console.log('Load Workout page rendered')
console.log('Workout exists?', workoutExists);

return (
    <>
       {workoutExists && 
        <div>
            <select onChange={handleLoadSelect} defaultValue='default'>
                <option value='default'>Select Workout</option> {
                    storedWorkouts.map((workout, index) => (
                    <option key={index} value={workout}>{workout}</option>
                ))
                }
            </select>
            <button id='loadWorkoutBtn' onClick={loadWorkout}>Load Workout</button>
            <button id='delWorkoutBtn' onClick={delWorkout}>Delete Workout</button>
        </div>
}
    </>
)


}