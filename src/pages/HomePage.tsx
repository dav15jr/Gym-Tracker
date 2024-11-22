import { useState } from 'react';
import { useAppContext } from '../assets/AppContext';
import NavBar from '../components/NavBar';
import Profile from '../components/Profile';
import LoadWorkouts from '../components/LoadWorkouts';
import SaveWorkout from '../components/SaveWorkout';
import Form from '../components/Exercise Form';
import Exercise from '../components/Exercise Card';
import useSetWorkoutTitle from '../assets/hooks/useSetWorkoutTitle';

const HomePage = () => {
    const {
        showSaveBTN,
        showExercises,
        workoutPlan,
        workoutName,
        workoutChanged,
    } = useAppContext();

    // I have moved the state up so that it can be shared with <Exercise /> component
    const [showLoad, setShowLoad] = useState(true);
    const [showForm, setShowForm] = useState(true);
    const { showWorkoutTitle, setShowWorkoutTitle } =
        useSetWorkoutTitle(workoutPlan);

    useSetWorkoutTitle(workoutPlan); //custom hook to set whether the Workout title should be shown or hidden.

    return (
        <>
            <div>
                <NavBar />
                <Profile />
                <div className="row justify-content-center">
                    {showExercises &&
                        (showForm ? (
                            <div className="col-12">
                                <Form />
                            </div>
                        ) : (
                            <div className="col-auto">
                                <button
                                    className="btn btn-outline-primary m-2 "
                                    onClick={() => setShowForm(true)}
                                    aria-label='Add New Exercise'
                                >
                                    Add New Exercise
                                </button>
                            </div>
                        ))}
                    {showLoad ? (
                        <div className="loadsave m-2 col-12">
                            <LoadWorkouts
                                setShowWorkoutTitle={setShowWorkoutTitle}
                            />
                        </div>
                    ) : (
                        <div className="col-auto">
                            <button
                                className="btn btn-outline-primary m-2"
                                onClick={() => setShowLoad(true)}
                                aria-label='Load Workout'
                            >
                                Load Workout
                            </button>
                        </div>
                    )}
                </div>
                <div>
                    {showWorkoutTitle && (
                        <h2 className="workoutTitle mt-5">
                            {workoutChanged
                                ? 'Save Updated Workout?'
                                : workoutName}
                        </h2>
                    )}
                    {showSaveBTN && workoutPlan.length > 1 && (
                        <SaveWorkout
                            setShowWorkoutTitle={setShowWorkoutTitle}
                        />
                    )}
                    <div className="workoutDiv m-3">
                        {
                            // If the workout plan array has a length then loop through the Exercise component and return a seperate copy of that component
                            workoutPlan.length > 0 &&
                                workoutPlan.map((workout, index) => {
                                    return (
                                        <Exercise
                                            key={workout.exercise}
                                            workout={workout}
                                            index={index}
                                            setShowForm={setShowForm}
                                            setShowLoad={setShowLoad}
                                        />
                                    );
                                })
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
