import { useState, useEffect, useCallback } from 'react';
import { ExerciseData } from '../types';
import useTimer from '../assets/hooks/useTimer';
import { Tooltip } from 'bootstrap';
import { useAppContext } from '../assets/AppContext';
// This component should have its own individual state...

export default function Exercise({
    workout,
    index,
    setShowForm,
    setShowLoad,
}: {
    workout: ExerciseData;
    index: number;
    setShowForm;
    setShowLoad;
}) {
    const { setShowSaveBTN, setWorkoutChanged, setWorkoutPlan } =
        useAppContext();
    const [exerciseStarted, setExerciseStarted] = useState<boolean>(false);
    const [exerciseDone, setExerciseDone] = useState<boolean>(false);
    const [showProgress, setShowProgress] = useState<boolean>(false);
    const [setDone, setSetDone] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [exProgress, setExProgress] = useState<number>(0);
    const { restTime, setRestTime, timerDone, setTimerDone } = useTimer(
        workout.rest,
        count,
        exerciseDone
    );
    const PROGRESS_MULTIPLIER = 1000;
    const PROGRESS_DECIMAL_PLACES = 10;
    
    useEffect(() => {
        //handle tooltips toggle
        const tooltipTriggerList = Array.from(
            document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
            new Tooltip(tooltipTriggerEl);
        });
    }, []);

    useEffect(() => {
        const perc =
            Math.round((count / Number(workout.sets)) * PROGRESS_MULTIPLIER) /
            PROGRESS_DECIMAL_PLACES;
        setExProgress(perc);
    }, [count, workout.sets]);

    const startExercise = useCallback(() => {
        setCount(0);
        setExerciseDone(false);
        setExerciseStarted(true);
        setShowProgress(true); // show progress bar
        setShowForm(false); //set state to hide the form and show add exercise
        setShowLoad(false); //set state to hide the load workout
    }, [setShowForm, setShowLoad]);

    const countSets = () => {
        setCount((count) => count + 1);

        if ((workout.sets || 0) - count <= 1) {
            setExerciseDone(true);
            setSetDone(false);
            setExerciseStarted(false);
        } else {
            setSetDone(true);
            setTimerDone(false);
            setRestTime(Number(workout.rest));
        }
        setShowForm(false);
        setShowLoad(false);
    };

    const deleteExercise = (index: number) => {
        //Takes the index of the current clicked exercise and checks if it exists in the current workoutPlan.
        setWorkoutPlan((oldPlan) => {
            //updates the state of the workoutPlan
            return oldPlan.filter((_, currentIndex) => currentIndex !== index); //filters for indexs that don't match and sends them to the current workoutPlan. Uses underscore as the first argument to indicate an unused argument.
        });
        setWorkoutChanged(true);
        setShowSaveBTN(true);
    };

    return (
        <div
            className={
                !exerciseDone
                    ? 'card text-center exerciseDiv pt-3'
                    : 'card text-center exerciseDiv bg-info pt-3'
            }
            id={`${workout.exercise}`}
        >
            <div
                className={!exerciseDone ? 'initial' : 'exfin'}
                id={`${workout.exercise}info`}
            >
                <div className="card-body pb-0 mt-3">
                    <h3 className="card-title">{workout.exercise}</h3>
                    {workout.sets} sets of {workout.reps} reps{' '}
                    {workout.type === 'body weight'
                        ? `using ${workout.type}`
                        : `with ${workout.amount} ${workout.type}`}{' '}
                    <br />
                    <span>Rest time:</span> {workout.rest} secs.
                </div>
            </div>
            <div
                className="progressDiv"
                id={`${workout.exercise}bar`}
                style={{ display: showProgress ? 'inherit' : 'none' }}
            >
                Progress:
                <div
                    className="progress "
                    role="progressbar"
                    aria-label="Exercise progress bar"
                    aria-valuenow={exProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-secondary"
                        style={{ width: `${exProgress}%` }}
                    >
                        {exProgress}%
                    </div>
                </div>
                <button
                    className={
                        !exerciseDone
                            ? 'btn btn-outline-primary'
                            : 'btn disabled'
                    }
                    id={`${workout.exercise}set`}
                    onClick={countSets}
                    aria-label="Count set"
                >
                    {!exerciseDone
                        ? `${(workout.sets || 0) - count} sets left.`
                        : `Done 💪`}
                </button>
            </div>
            <button
                className={
                    !exerciseDone
                        ? 'btn btn-primary'
                        : 'btn btn-outline-secondary'
                }
                id={`${workout.exercise}start`}
                style={{ display: exerciseStarted ? 'none' : 'initial' }}
                onClick={startExercise}
                aria-label="Start Exercise"
            >
                {' '}
                {!exerciseDone ? 'Start' : 'Restart'}
                {` ${workout.exercise}`}
            </button>
            <h5
                className={!timerDone ? 'timer' : 'restDone'}
                id={`${workout.exercise}timer`}
                style={{ display: setDone ? 'initial' : 'none' }}
            >
                {!timerDone
                    ? `⏳ ${restTime}'s rest left.`
                    : `Get back to work.🏋️‍♂️`}
            </h5>
            <button
                type="button"
                className=" btn-close btn-close-custom"
                id={`${workout.exercise}delete`}
                onClick={() => deleteExercise(index)}
                aria-label="Delete Exercise"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Delete Exercise"
            ></button>
        </div>
    );
}
