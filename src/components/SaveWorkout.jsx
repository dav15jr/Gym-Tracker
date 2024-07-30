import React from 'react'
import { useState} from 'react';
import { doc, setDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAppContext } from '../assets/AppContext';

const SaveWorkout = ({ setShowWorkoutTitle}) => {
const [saveWorkout, setSaveWorkout] = useState();
const { userID, setShowSaveBTN, setWorkoutName, workoutPlan, setWorkoutChanged } = useAppContext();
//--------------Save Workout----------------

const handleSaveChange =(e) => {
    setSaveWorkout(e.target.value)
    }

const saveWorkoutPlan = (event) => {
    event.preventDefault();
    const workoutTitle = event.target.workoutName.value
    saveWorkoutsToFirestore();   //save data to firestore
    setWorkoutName(workoutTitle)  
    setShowWorkoutTitle(true);
    setWorkoutChanged(false);
    setShowSaveBTN(false)
    }
        
async function saveWorkoutsToFirestore (){
    await setDoc(doc(db, userID, saveWorkout), {    // Add a new 'Workout' document in 'userID' collection
    workoutPlan
    });
    alert("Workout saved successfully");
    }

return (
<>
    <div className='row justify-content-center'>
        <form className='col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3 col-xxl-2.5 m-3' onSubmit={saveWorkoutPlan}>
        <div className='input-group'>
            <input 
                className='form-control' 
                name='workoutName' 
                id='saveWorkout' 
                type="text" 
                placeholder='Workout Name'
                onChange={handleSaveChange}  // Handle change from typed input. 
                required/>
            <button className='btn btn-secondary' type='submit'>Save WorkOut</button> 
        </div>
        </form>
    </div>
</>
  )
}

export default SaveWorkout

