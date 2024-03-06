import { useState } from 'react';
import Exercise from './Exercise';
import Form from './Form';

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
    const [workoutPlan, setWorkoutPlan] = useState([]);
    // Check the console to see the workoutPlans being added as you submit the form
    console.log(workoutPlan);
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
            <>
                {
                    // Checking that the workout plan array has a length
                    // IF it does then loop through the Exercise component and return a seperate copy of that component
                    workoutPlan.length &&
                        workoutPlan.map((workout, index) => {
                            // May be best to use a different key here, perhaps the name of the workout
                            return <Exercise key={index} workout={workout} />;
                        })
                }
            </>
        </>
    );
};

export default Tool;
