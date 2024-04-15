import { useEffect, useState } from 'react';
import SplitButton from 'react-bootstrap/SplitButton'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Exercise from './Exercise';
import Form from './Form';
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
    const [loadWorkout, setLoadWorkout] = useState();
    const [workoutName, setWorkoutName] = useState();
    const [workoutPlan, setWorkoutPlan] = useState([]);
    const [savedWorkouts, setSavedWorkouts] = useState([]);
    const [workoutExists, setWorkoutExists] = useState(false);
    const [showForm, setShowForm] = useState(true);

    const deleteExercise = (index: number) => {      //Takes the index of the current clicked exercise and checks if it exists in the current workoutPlan. 
        setWorkoutPlan(oldPlan => {                 //updates the state of the workoutPlan
            return oldPlan.filter((_, currentIndex) => currentIndex !== index)      //filters for indexs that don't match and sends them to the current workoutPlan. Uses underscore as the first argument to indicate an unused argument.
        })
        }
        
    useEffect(() => {
        const workouts = Object.entries(localStorage) 
        if (workouts.length > 1){  //check if a workout exists - not including the 'debug' hence using > 1 not > 0
            setWorkoutExists(true)
        }
        const storedNames = Object.keys(localStorage);
        setSavedWorkouts(storedNames.filter((name) => name !== 'debug')) // filter out the 'debug' entry in local storage    
    },[workoutName])    

    
    const handleSelect =(e) => {
        setLoadWorkout(e.target.value)
    }
    const saveWorkoutPlan = (event) => {
        event.preventDefault();
        const workoutTitle = event.target.input.value
        const json = JSON.stringify(workoutPlan);   //Convert the object to a string and store it in the local storage
        localStorage.setItem(`${workoutTitle}`, json);
        setWorkoutName(workoutTitle)

    }

const currentExercises = workoutPlan.map((workout) => workout.exercise);

const loadWorkoutPlan = () => {
    if(currentExercises.includes(`${loadWorkout}`)){    //check if the current exercise already exists
        alert('Sorry, Workout already exists')
    } 
    else if(!loadWorkout){    //check if the current workout already exists
        alert('Please select a Workout')
    } 
    else{
        const load = JSON.parse(localStorage.getItem(`${loadWorkout}`)) //load the exercise if it is not already loaded.
        setWorkoutName(loadWorkout)
        const mergedWorkout = [...load, ...workoutPlan];  //merge the current workout with the loaded workout.
        const newWorkoutPlan = mergedWorkout.filter((item, index, self) => {  //Use filter to remove duplicate objects, keeping the last occurrence
            return index === self.findIndex(obj => (  // Use findIndex to check if the current item is the last occurrence of the object
                obj.exercise === item.exercise // Compare objects based on 'exercise' property
            ));
        });
        setWorkoutPlan(newWorkoutPlan)
    }
} 
    return (
        <>
            <h1>Gym Tracker</h1>
            {showForm ? (<Form
                    setExerciseData={setExerciseData}
                    exerciseData={exerciseData}
                    setWorkoutPlan={setWorkoutPlan}
                    workoutPlan={workoutPlan}
                    defaultExerciseState={defaultExerciseState}
                />):(<button 
                    id="formBtn" 
                    onClick={()=> (setShowForm(true))} 
                    >Add New Exercise
                </button>)}
            {workoutExists && 
            <div>
                <select onChange={handleSelect} >
                    <option value="">Select Workout</option> {
                        savedWorkouts.map((workout, index) => (
                        <option key={index} value={workout}>{workout}</option>
                    ))
                    }
                </select>
                <button onClick={loadWorkoutPlan}>Load Workout</button>
            </div>}
            {workoutPlan.length > 1 && 
            <div>
                <form onSubmit={saveWorkoutPlan}>
                    <input name='input' type="text" placeholder='Workout Name'></input>
                    <button type='submit'>Save WorkOut</button>
                </form>
            </div>
            } 
            <div>
                <h1 className='workoutTitle'>{!workoutName ? '' : workoutName}</h1>
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
