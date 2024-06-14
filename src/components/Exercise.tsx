import { useState} from 'react';
import { ExerciseData } from '../types';
import useTimer from '../assets/hooks/useTimer';
// This component should have its own individual state...

export default function Exercise ({workout, deleteExercise, index, setShowForm}: { workout: ExerciseData, deleteExercise, index: number, setShowForm}) {

    const [exerciseStarted, setExerciseStarted] = useState(false);
    const [exerciseDone, setExerciseDone] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const [setDone, setSetDone] = useState(false);
    const [count, setCount] = useState(0);
    const { restTime, setRestTime, timerDone, setTimerDone} = useTimer(workout.rest, count, exerciseDone);

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
        } else {
            setSetDone(true);
            setTimerDone(false);
            setRestTime(workout.rest);
        }
    }

    return (
        <div className='exerciseDiv' id={`${workout.exercise}`} >
            <div className={!exerciseDone ? 'infoDiv' : 'exfin'} 
                id={`${workout.exercise}info`} >
                <h2>{workout.exercise}</h2>
                {workout.sets} sets of {workout.reps} reps{' '}
                {workout.type === 'body weight' ? `using ${workout.type}` :
                `with ${workout.amount} ${workout.type}`} <br />
                <span>Rest time:</span> {workout.rest} secs.
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
                    className={!exerciseDone ? 'setBtn' : 'btnFin'} 
                    id={`${workout.exercise}set`}
                    onClick = {countSets}
                    >{!exerciseDone ? `${workout.sets-count} sets left.` : `Done 💪`}
                </button>
            </div>
            <button 
                className='startBtn' 
                id={`${workout.exercise}start`} 
                style={{display: exerciseStarted ? 'none' : 'initial' }}
                onClick = {startExercise}
                > {!exerciseDone ? 'Start' : 'Restart' }{` ${workout.exercise}`}
            </button>
            <button
                className={!timerDone ? 'timerBtn': 'restDone'}
                id={`${workout.exercise}timer`}
                style={{display: setDone ? 'initial' : 'none'}}
                // onClick = {}
                 >{!timerDone ? `⏳ ${restTime}'s rest left.` : `Get back to work.🏋️‍♂️`}
            </button>
                <button
                    className='deleteBTN'
                    id={`${workout.exercise}delete`}
                    onClick = {()=> deleteExercise(index)}
                    > ×
                </button>
         </div>
    );
}

