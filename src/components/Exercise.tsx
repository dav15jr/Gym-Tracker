import { useState, useEffect} from 'react';
import { ExerciseData } from '../types';

// This component should have its own individual state...

const Exercise = ({ workout }: { workout: ExerciseData } ) => {
    const [excerciseStarted, setExcerciseStarted] = useState(false);
    const [excerciseDone, setExcerciseDone] = useState(false);
    const [showProgress, setShowProgress] = useState(false);

    const [timerDone, setTimerDone] = useState(false);
    const [setDone, setSetDone] = useState(false);
    
    const [restTime, setRestTime] = useState(workout.rest);
    const [count, setCount] = useState(0);

    const form = document.querySelector('form');
    const formBtn = document.getElementById('formBtn');

    
    const startExercise = () => {  
        formBtn.style.display = 'block';
        form.style.display = "none"
        setCount(0);
        setExcerciseDone(false);
        setExcerciseStarted(true);
        setShowProgress(true);
    }
    
    const countSets = () => {
        // clearInterval(timer);
        // stopRest();
        setCount((count) => count + 1);

        if (workout.sets-count <= 1) {
            setExcerciseDone(true);
            setSetDone(false);
            setExcerciseStarted(false);
        } else {
            setSetDone(true);
            setTimerDone(false);
            setRestTime(workout.sets);
        }
    }

    useEffect(() => {
        console.log("im effected")

        if (count ===0) return;
        if (excerciseDone) return;
        else {

        const intervalId = setInterval(() => {
                if (restTime === 0) {
                    setTimerDone(true);
                    clearInterval(intervalId);
                    return
                } else;
                setRestTime(time => time - 1);
        }, 1000);
    
        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        }
      }, [restTime, count, excerciseDone]);


    
    return (
        <div className='exerciseDiv' id={`${workout.exercise}`}>
            <div className={!excerciseDone ? 'infoDiv' : 'exfin'} 
                id={`${workout.exercise}info`} >
                <h2>Exercise: {workout.exercise}</h2>
                {workout.sets} sets of {workout.reps} reps{' '}
                {workout.amount && `with ${workout.amount} ${workout.type}`} <br />
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
                    className={!excerciseDone ? 'setBtn' : 'btnFin'} 
                    id={`${workout.exercise}set`}
                    onClick = {countSets}
                    >{!excerciseDone ? `${workout.sets-count} sets left.` : `Done 💪`}
                </button>
            </div>
            <button 
                className='startBtn' 
                id={`${workout.exercise}start`} 
                style={{display: excerciseStarted ? 'none' : 'initial' }}
                onClick = {startExercise}
                > {!excerciseDone ? 'Start' : 'Restart' }{` ${workout.exercise}`}
            </button>
            <button
                className={!timerDone ? 'timerBtn': 'restDone'}
                id={`${workout.exercise}timer`}
                style={{display: setDone ? 'initial' : 'none'}}
                // onClick = {}
                 >{!timerDone ? `${restTime}'s rest left.` : `Get back to work.🏋️‍♂️`}
            </button>
         </div>
    );
};

export default Exercise;
