import { useState} from 'react';
import { doc, getDoc, deleteDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";
import useCheckStoredWorkouts from '../assets/hooks/useCheckStoredWorkouts';
import { useAppContext } from '../assets/AppContext'; 

export default function LoadWorkouts({setShowWorkoutTitle}){

const { userID, setShowSaveBTN, setWorkoutPlan, setWorkoutName,setWorkoutChanged } = useAppContext();
const [loadedWorkout, setLoadedWorkout] = useState();
const { workoutExists, storedWorkouts, fetchStoredWorkouts, btnDisabled, setBtnDisabled} = useCheckStoredWorkouts(userID );

//------------------------------Load Workout--------------------
useCheckStoredWorkouts(userID); 

const handleLoadSelect =(e) => {
    setLoadedWorkout(e.target.value)
        if(e.target.value == 'default'){    //check if the current workout already exists
            setBtnDisabled(true)
        } else {
            setBtnDisabled(false)
        }
    }

const loadWorkout = () => {
    const fetchWorkoutData = async () => {
        try {
            const tempArr = [];
            const docRef = doc(db, userID, loadedWorkout);
            const docSnap = await getDoc(docRef);
            const workData = docSnap.data()
            workData.workoutPlan.forEach((doc) => {
                tempArr.push(doc);
                });
            setWorkoutPlan(tempArr)
        } catch (error) {
        console.log("Error loading workouts",error)
        }
    };
        fetchWorkoutData()
        setShowWorkoutTitle(true)
        setWorkoutName(loadedWorkout)
        setShowSaveBTN(false)
        setWorkoutChanged(false)
} 

//------------------------------Delete Workout--------------------
const delWorkout = () => {
    deleteDoc(doc(db, userID, loadedWorkout)); //delete workout from Firestore DB
    fetchStoredWorkouts();   //Fetch fresh data from Firestore DB 
}

return (
<>
    {workoutExists && 
    <div className='col-auto'>
        <h2>Stored Workouts</h2>
        <div className="input-group justify-content-center" role="group" aria-label="Button group with nested select list">

            <button type="button" className="btn btn-outline-secondary px-3 px-sm-4 px-lg-5" data-bs-toggle="modal" data-bs-target="#deleteModal" disabled={btnDisabled}>Delete</button>

            <select  className="form-select" id='storedWorkouts' onChange={handleLoadSelect} defaultValue='default'>
                        <option value='default'>Select Workout</option> {
                            storedWorkouts.map((workout, index) => (
                                <option key={index} value={workout}>{workout}</option>
                            ))}
            </select>
            <button type="button" className="btn btn-outline-primary px-3 px-sm-4 px-lg-5" onClick={loadWorkout} disabled={btnDisabled}>Load</button>
        </div>    

        <div className="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content ">
            <div className="modal-header ">
                <h1 className="modal-title fs-5 w-100 text-center" id="staticBackdropLabel">Confirm Workout Delete</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                Are you sure you want to delete {loadedWorkout} Workout?
            </div>
            <div className="modal-footer justify-content-center">
                <button type="button" className="btn btn-info mx-2" data-bs-dismiss="modal">No</button>
                <button type="button" className="btn btn-warning mx-2" data-bs-dismiss="modal" onClick={delWorkout}>Yes, Delete</button>
            </div>
            </div>
        </div>
        </div>
    </div>
    }
</>
)
}