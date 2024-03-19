import { useState } from 'react';
import Exercise from './Exercise';
import Form from './Form';
// import './src/index.css';

const defaultExerciseState = {
    exercise: '',
    type: 'Resistance',
    amount: '',
    reps: '',
    sets: '',
    rest: '',
};

const Tool = () => {
    // I have moved the state up so that it can be shared with <Exercise /> component
    const [exerciseData, setExerciseData] = useState(defaultExerciseState);
    const [workoutPlan, setWorkoutPlan] = useState([]);

    const deleteExercise = (index: number) => {               //Takes the index of the current clicked exercise and checks if it exists in the current workoutPlan. 
        setWorkoutPlan(oldPlan => {                 //updates the state of the workoutPlan
            return oldPlan.filter((_, currentIndex) => currentIndex !== index)          //filters for indexs that don't match and sends them to the current workoutPlan. Uses underscore as the first argument to indicate an unused argument.
        })
        }


    return (
        <>
            <h1>Gym Tracker</h1>
            <Form
                setExerciseData={setExerciseData}
                exerciseData={exerciseData}
                setWorkoutPlan={setWorkoutPlan}
                workoutPlan={workoutPlan}
                defaultExerciseState={defaultExerciseState}
            />
            <div className='workoutDiv' >
                {
                // Checking that the workout plan array has a length
                // IF it does then loop through the Exercise component and return a seperate copy of that component
                workoutPlan.length > 0 &&
                    workoutPlan.map((workout, index) => {
                    return <Exercise key={workout.exercise} workout={workout} index={index} deleteExercise={deleteExercise} />;
                    })
                }
            </div>
        </>
    );
};

export default Tool;
