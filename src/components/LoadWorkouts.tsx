import { useEffect, useState} from 'react';
import { doc, getDoc, deleteDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";
import useCheckStoredWorkouts from '../assets/hooks/useCheckStoredWorkouts'; 

export default function LoadWorkouts({userID, setWorkoutPlan, setWorkoutName, setShowWorkoutTitle, setShowSaveBTN}){


 const [loadedWorkout, setLoadedWorkout] = useState();
 const [btnDisabled, setBtnDisabled] = useState(true);
 const { workoutExists, storedWorkouts, fetchStoredWorkouts} = useCheckStoredWorkouts(userID );
//  let myModal = document.getElementById('staticBackdrop');

//------------------------------Load Workout--------------------
useCheckStoredWorkouts(userID); 

useEffect(() => {
    if(loadedWorkout === 'default'){    //check if the current workout already exists
        setBtnDisabled(true)
        } else {
        setBtnDisabled(false)
        }
},[loadedWorkout, userID])

// console.log('User ID on Loads page', userID);

const handleLoadSelect =(e) => {
    setLoadedWorkout(e.target.value)
    console.log(loadedWorkout)
    }

const loadWorkout = () => {
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
    <div className='col-12 col-sm-8'>
        <h2>Stored Workouts</h2>
        <div className="input-group justify-content-center" role="group" aria-label="Button group with nested select list">

            <button type="button" className="btn btn-danger px-3 px-sm-4 px-lg-5" data-bs-toggle="modal" data-bs-target="#deleteModal" disabled={btnDisabled}>Delete</button>

            <select  className="select px-1" onChange={handleLoadSelect} defaultValue='default'>
                        <option value='default'>Select Workout</option> {
                            storedWorkouts.map((workout, index) => (
                                <option key={index} value={workout}>{workout}</option>
                            ))}
            </select>
            <button type="button" className="btn btn-success px-3 px-sm-4 px-lg-5" onClick={loadWorkout} disabled={btnDisabled}>Load</button>
        </div>    

         {/* <!-- Modal --> */}
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
                <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">No</button>
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