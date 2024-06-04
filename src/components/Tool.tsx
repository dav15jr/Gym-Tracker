import { useState } from 'react';
import Exercise from './Exercise';
import Form from './Form';
import useCheckStoredWorkouts from '../assets/hooks/useCheckStoredWorkouts'; 
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
const Tool = () => {
    // I have moved the state up so that it can be shared with <Exercise /> component
    const [exerciseData, setExerciseData] = useState(defaultExerciseState);
    const [loadedWorkout, setLoadedWorkout] = useState();
    const [workoutName, setWorkoutName] = useState('');
    const [workoutPlan, setWorkoutPlan] = useState([]);
    const [workoutChanged, setWorkoutChanged] = useState(false);
    const [showForm, setShowForm] = useState(true);

    const { workoutExists, savedWorkouts, storedWorkouts} = useCheckStoredWorkouts(workoutName);
    const {showWorkoutTitle, setShowWorkoutTitle} = useSetWorkoutTitle(workoutPlan)
        
useCheckStoredWorkouts(workoutName);   //custom hook to check local storage and load workout list.

useSetWorkoutTitle(workoutPlan);  //custom hook to set whether the Workout title should be shown or hidden. 

const handleSelect =(e) => {
        setLoadedWorkout(e.target.value)
    }

const saveWorkoutPlan = (event) => {
        event.preventDefault();
        const workoutTitle = event.target.workoutName.value
        const json = JSON.stringify(workoutPlan);   //Convert the object to a string and store it in the local storage
        localStorage.setItem(`${workoutTitle}`, json);
        setWorkoutName(workoutTitle)  
        setShowWorkoutTitle(true);
        setWorkoutChanged(false)
    }

const currentWorkouts = workoutPlan.map((workout) => workout.exercise);

const loadWorkout = () => {
    if(currentWorkouts.includes(`${loadedWorkout}`)){    //check if the current exercise already exists
        alert('Sorry, Workout already exists')
        } 
    else if(!loadedWorkout){    //check if the current workout already exists
        alert('Please select a Workout')
        } 
    else{
        const storedWorkout = JSON.parse(localStorage.getItem(`${loadedWorkout}`)) //load the exercise if it is not already loaded.
        const mergedWorkout = [...storedWorkout, ...workoutPlan];  //merge the current workout with the loaded workout.
        const newWorkoutPlan = mergedWorkout.filter((item, index, self) => {  //Use filter to remove duplicate objects, keeping the last occurrence
            return index === self.findIndex(obj => (  // Use findIndex to check if the current item is the last occurrence of the object
            obj.exercise === item.exercise // Compare objects based on 'exercise' property
        ));
    });
    setWorkoutName(loadedWorkout)
        setWorkoutPlan(newWorkoutPlan)
        setShowWorkoutTitle(true);
        setWorkoutChanged(false)
        }
    } 

const delWorkout = () => {
    localStorage.removeItem(`${loadedWorkout}`);
    storedWorkouts();
}

const deleteExercise = (index: number) => {      //Takes the index of the current clicked exercise and checks if it exists in the current workoutPlan. 
    setWorkoutPlan(oldPlan => {                 //updates the state of the workoutPlan
        return oldPlan.filter((_, currentIndex) => currentIndex !== index)      //filters for indexs that don't match and sends them to the current workoutPlan. Uses underscore as the first argument to indicate an unused argument.
    }) 
    setWorkoutChanged(true)
}
    return (
        <>
            {showForm ? (<Form
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
                </button>)}
            <div className='loadsave'>
            {workoutExists && 
            <div>
                <select onChange={handleSelect} defaultValue='default'>
                    <option value='default'>Select Workout</option> {
                        savedWorkouts.map((workout, index) => (
                        <option key={index} value={workout}>{workout}</option>
                    ))
                    }
                </select>
                <button id='loadWorkoutBtn' onClick={loadWorkout}>Load Workout</button>
                <button id='delWorkoutBtn' onClick={delWorkout}>Delete Workout</button>
            </div>}
            {(workoutPlan.length > 1) && 
            <div>
                <form onSubmit={saveWorkoutPlan}>
                    <input name='workoutName' id='saveWorkout' type="text" placeholder='Workout Name' required></input>
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
        </>
    );
};

export default Tool;
