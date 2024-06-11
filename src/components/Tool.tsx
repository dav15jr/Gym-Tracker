import { useState} from 'react';
import { doc, setDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Login from './Login';
import Profile from './Profile';
import LoadWorkouts from './LoadWorkouts';
import Form from './Form';
import Exercise from './Exercise';
import useSetWorkoutTitle from '../assets/hooks/useSetWorkoutTitle'; 
// import './src/index.css';

const defaultExerciseState = {
    exercise: '',
    type: 'resistance',
    amount: '',
    reps: '',
    sets: '',
    rest: '',
};
export default function Tool () {
    // Moved the state up so that it can be shared with <Exercise /> component
    const [exerciseData, setExerciseData] = useState(defaultExerciseState);
    const [savedWorkout, setSavedWorkout] = useState();
    const [workoutName, setWorkoutName] = useState('');
    const [workoutPlan, setWorkoutPlan] = useState([]);
    const [workoutChanged, setWorkoutChanged] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [userID, setUserID] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState('');

    const { showWorkoutTitle, setShowWorkoutTitle } = useSetWorkoutTitle(workoutPlan)


console.log('tool page rendered')


useSetWorkoutTitle(workoutPlan);  //custom hook to set whether the Workout title should be shown or hidden.
//------------------------------Save Workout----------------------

const handleSaveChange =(e) => {
    setSavedWorkout(e.target.value)
    }

const saveWorkoutPlan = (event) => {
    event.preventDefault();
    const workoutTitle = event.target.workoutName.value
    setWorkoutName(workoutTitle)  
    setShowWorkoutTitle(true);
    setWorkoutChanged(false);

    saveDataToFirestore();   //save data to firestore
    }
        
async function saveDataToFirestore  (){
    await setDoc(doc(db, userID, savedWorkout), {    // Add a new 'Workout' document in 'userID' collection
    workoutPlan
    });
    alert("Workout saved successfully");
    }
    
//------------------------------Load Workout--------------------


//------------------------------Edit Workout--------------------

const deleteExercise = (index: number) => {      //Takes the index of the current clicked exercise and checks if it exists in the current workoutPlan. 
    setWorkoutPlan(oldPlan => {                 //updates the state of the workoutPlan
        return oldPlan.filter((_, currentIndex) => currentIndex !== index)      //filters for indexs that don't match and sends them to the current workoutPlan. Uses underscore as the first argument to indicate an unused argument.
    }) 
    setWorkoutChanged(true)
}

    return (
        <>
            {!isLoggedIn ? ( 
                <Login 
                setIsLoggedIn = {setIsLoggedIn}
                setUserID = {setUserID}
                /> ) : (
            <div>
                <Profile 
                userID = {userID} 
                userName ={userName}
                setUserName ={setUserName}
                />
                {showForm ? 
                    (<Form
                        setExerciseData={setExerciseData}
                        exerciseData={exerciseData}
                        setWorkoutPlan={setWorkoutPlan}
                        workoutPlan={workoutPlan}
                        defaultExerciseState={defaultExerciseState}
                        setWorkoutChanged ={setWorkoutChanged}
                    />):(<button 
                        id="showFormBtn" 
                        onClick={()=> (setShowForm(true))} 
                        >Add New Exercise
                    </button>)
                }
                <div className='loadsave'>
                    <LoadWorkouts
                        userID ={userID}
                        workoutName = {workoutName}
                        setWorkoutName = {setWorkoutName}
                        setWorkoutPlan = {setWorkoutPlan}
                        setWorkoutChanged = {setWorkoutChanged}
                        setShowWorkoutTitle = {setShowWorkoutTitle}
                    />
                    {(workoutPlan.length > 1) && 
                    <div>
                        <form onSubmit={saveWorkoutPlan}>
                            <input name='workoutName' id='saveWorkout' type="text" placeholder='Workout Name'
                            onChange={handleSaveChange}  // Handle change from typed input. 
                            required></input>
                            <button id='saveWorkoutBtn' type='submit'>Save WorkOut</button>
                        </form>
                    </div>
                    } 
                </div>
                <div>
                {(showWorkoutTitle) && <h1 className='workoutTitle'>{workoutChanged ? 'Save Updated Workout?' : workoutName}</h1>}
                    <div className='workoutDiv' >
                        {
                        // Checking that the workout plan array has a length
                        // IF it does then loop through the Exercise component and return a seperate copy of that component
                        workoutPlan.length > 0 &&
                            workoutPlan.map((workout, index) => {
                            return <Exercise key={workout.exercise} workout={workout} index={index} deleteExercise={deleteExercise} setShowForm={setShowForm} />;
                            })
                        }
                    </div>
                </div>
            </div>)}
        </>
    );
}
