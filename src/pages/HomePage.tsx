import { lazy, Suspense, useState } from 'react';
import { useAppContext } from '../assets/AppContext';
import NavBar from '../components/NavBar';
import Profile from '../components/Profile';
const LoadWorkouts = lazy(() => import('../components/LoadWorkouts'));
const SaveWorkout = lazy(() => import('../components/SaveWorkout'));
const Form = lazy(() => import('../components/Exercise Form'));
const Exercise = lazy(() => import('../components/Exercise Card'));
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
    const [showLoad, setShowLoad] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(true);
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
                                <Suspense fallback={<div>Loading form...</div>}>
                                    <Form />
                                </Suspense>
                            </div>
                        ) : (
                            <div className="col-auto">
                                <button
                                    className="btn btn-outline-primary m-2 "
                                    onClick={() => setShowForm(true)}
                                    aria-label="Add New Exercise"
                                >
                                    Add New Exercise
                                </button>
                            </div>
                        ))}
                    {showLoad ? (
                        <div className="loadsave m-2 col-12">
                            <Suspense fallback={<div>Loading workouts...</div>}>
                                <LoadWorkouts
                                    setShowWorkoutTitle={setShowWorkoutTitle}
                                />
                            </Suspense>
                        </div>
                    ) : (
                        <div className="col-auto">
                            <button
                                className="btn btn-outline-primary m-2"
                                onClick={() => setShowLoad(true)}
                                aria-label="Load Workout"
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
                        <Suspense fallback={<div>Saving workout...</div>}>
                            <SaveWorkout
                                setShowWorkoutTitle={setShowWorkoutTitle}
                            />
                        </Suspense>
                    )}
                    <div className="workoutDiv m-3">
                        {workoutPlan.length > 0 &&
                            workoutPlan.map((workout, index) => (
                                <Suspense
                                    key={workout.exercise}
                                    fallback={<div>Loading exercise...</div>}
                                >
                                    <Exercise
                                        workout={workout}
                                        index={index}
                                        setShowForm={setShowForm}
                                        setShowLoad={setShowLoad}
                                    />
                                </Suspense>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
