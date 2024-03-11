import { useState} from 'react';
import { ExerciseData } from '../types';

// This component should have its own individual state...

const Exercise = ({ workout }: { workout: ExerciseData } ) => {
    const [excerciseStarted, setExcerciseStarted] = useState(false);
    const [excerciseDone, setExcerciseDone] = useState(false);
    const [timerDone, setTimerDone] = useState(false);
    const [setDone, setSetDone] = useState(false);
    const [restTime, setRestTime] = useState(workout.rest);
    const [count, setCount] = useState(0);

    const form = document.querySelector('form');
    const formBtn = document.getElementById('formBtn');

    
    const startExercise = () => {  
        setCount(0);
        formBtn.style.display = 'block';
        form.style.display = "none"
        setExcerciseStarted(true);

    }
    
    const resetExercise = () => {
        setExcerciseDone(false);
        setCount(0);
    }

    const countSets = () => {
        stopRest();
        startTime();
        setCount((count) => count + 1);

        if (workout.sets-count <= 1) {
            setExcerciseDone(true);
            setSetDone(false);
            // setExcerciseStarted(false);
        } else {
            setSetDone(true);
            setTimerDone(false);
            setRestTime(workout.sets);
        }
    }
    let timer;

    const startTime = () =>{ 
     timer = setInterval(counter, 1000);
        const rest = workout.rest;
        setRestTime(rest);
        setTimerDone(false);
    } 

    const counter = () =>{
      setRestTime((time) => {
    
              if (time <= 1) {
                // clearInterval(timer);
                setTimerDone(true);
              } else return time - 1;
            })
        }
    const stopRest = () => clearInterval(timer);

    
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
                style={{ display: excerciseStarted ? 'inherit' : 'none' }}>
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
                onClick = {!excerciseDone ? startExercise : resetExercise}
                > {!excerciseDone ? 'Start' : 'Restart' }{` ${workout.exercise}`}
            </button>
            <button
                className={!timerDone ? 'timerBtn': 'restDone'}
                id={`${workout.exercise}timer`}
                style={{display: !setDone ? 'none' : 'initial' }}
                onClick = {stopRest}
                 >{!timerDone ? `${restTime}'s rest left.` : `Get back to work.🏋️‍♂️`}
            </button>
         </div>
    );
};

export default Exercise;
