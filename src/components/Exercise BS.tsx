import { useState, useEffect} from 'react';
import { ExerciseData } from '../types';
import useTimer from '../assets/hooks/useTimer';
import { Tooltip } from "bootstrap"
// This component should have its own individual state...

export default function Exercise ({workout, deleteExercise, index, setShowForm}: { workout: ExerciseData, deleteExercise, index: number, setShowForm}) {

    const [exerciseStarted, setExerciseStarted] = useState(false);
    const [exerciseDone, setExerciseDone] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const [setDone, setSetDone] = useState(false);
    const [count, setCount] = useState(0);
    const [exProgress, setExProgress] = useState(0);
    const { restTime, setRestTime, timerDone, setTimerDone} = useTimer(workout.rest, count, exerciseDone);


    // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    // const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    
    useEffect(() => {
        const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach(tooltipTriggerEl => {
          new Tooltip(tooltipTriggerEl);
        });
      }, []);

    const startExercise = () => {  
        setCount(0);
        setExerciseDone(false);
        setExerciseStarted(true); 
        setShowProgress(true);  // show progress bar
        setShowForm(false);     //set state to hide the form and show add exercise
    }

    const countSets = () => {
        setCount((count) => count + 1);
        if (workout.sets-count <= 1) {
            setExerciseDone(true);
            setSetDone(false);
            setExerciseStarted(false);
            setExProgress(Math.ceil(count / workout.sets * 100))
        } else {
            setSetDone(true);
            setTimerDone(false);
            setRestTime(workout.rest);
            setExProgress(0)
        }
    }

    return (
        <div className='card text-center exerciseDiv bg-info pt-3' id={`${workout.exercise}`} >
            <div className={!exerciseDone ? 'infoDiv' : 'exfin'} 
                id={`${workout.exercise}info`} >
                <div className="card-body">
                <h3 className="card-title">{workout.exercise}</h3>
                {workout.sets} sets of {workout.reps} reps{' '}
                {workout.type === 'body weight' ? `using ${workout.type}` :
                `with ${workout.amount} ${workout.type}`} <br />
                <span>Rest time:</span> {workout.rest} secs.
                </div>
            </div>
            <div className='progressDiv' id={`${workout.exercise}bar`} 
                style={{ display: showProgress ? 'inherit' : 'none' }}>
                Progress:
                <progress 
                    className='progressEle' 
                    id={`${workout.exercise}progress`}
                    value={`${count}`}
                    max={`${workout.sets}`}>
                </progress>
                <button
                    className={!exerciseDone ? 'setBtn btn btn-success' : 'btn btn-secondary disabled'} 
                    id={`${workout.exercise}set`}
                    onClick = {countSets}
                    >{!exerciseDone ? `${workout.sets-count} sets left.` : `Done 💪`}
                </button>
            </div>
            {/* <div className="progress w-75" role="progressbar" aria-label="Warning example" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                <div className="progress-bar bg-success" style={{width: "${70}%"}}>65% {exProgress}</div>
            </div> */}
            <button 
                className='btn btn-primary startBtn' 
                id={`${workout.exercise}start`} 
                style={{display: exerciseStarted ? 'none' : 'initial' }}
                onClick = {startExercise}
                > {!exerciseDone ? 'Start' : 'Restart' }{` ${workout.exercise}`}
            </button>
            <button
                className={!timerDone ? 'timerBtn': 'restDone'}
                id={`${workout.exercise}timer`}
                style={{display: setDone ? 'initial' : 'none'}}
                // onClick = {} pause timer.
                 >{!timerDone ? `⏳ ${restTime}'s rest left.` : `Get back to work.🏋️‍♂️`}
            </button>
            <button 
                type="button" 
                className=" btn-close btn-close-custom" 
                id={`${workout.exercise}delete`}
                onClick = {()=> deleteExercise(index)}
                aria-label="Delete Exercise" 
                data-bs-toggle="tooltip" 
                data-bs-placement="top" 
                title="Delete Exercise">
                </button>
                {/* <button
                type="button"
                    className='deleteBTN'data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Exercise"
                    id={`${workout.exercise}delete`}
                    onClick = {()=> deleteExercise(index)}
                    > ×
                </button> */}
         </div>
    );
}

