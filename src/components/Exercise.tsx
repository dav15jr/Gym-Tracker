import { ExerciseData } from '../types';

// This component should have its own individual state...

const Exercise = ({ workout }: { workout: ExerciseData } ) => {


   const workFunctions = () => {
        const startBtn = document.getElementById('startBtn')
        const setBtn = document.getElementById('setBtn') as HTMLInputElement
        const timerBtn = document.getElementById('timerBtn')
        const infoDiv = document.getElementById('infoDiv')
        const progressEle = document.getElementById('progressEle') as HTMLInputElement
    


    // const progressBar = () => {    // create a progress bar and add it to its div element
    //     progressEle.setAttribute("value", "0");
    //     progressEle.setAttribute("max", `${sets}`);

    //     document.getElementById(`${exeName}bar`).innerText = 'Progress:' ;
    //     document.getElementById(`${exeName}bar`).appendChild(progressEle);
    //     document.getElementById(`${exeName}bar`).appendChild(setBtn);
    //   }
             
  const showStartButton = () => {  
        startBtn.style.display = "initial";
        startBtn.textContent = `Restart ${workout.exercise}`;
        startBtn.addEventListener('click', resetExercise);
      }
      
  const showSetButton = () => {  
        const form = document.querySelector('form');
        const formBtn = document.getElementById('formBtn');
        formBtn.style.display = 'block';
        form.style.display = "none"
        startBtn.style.display = "none";
        setBtn.style.display = "block";
        setBtn.textContent = `${count--} sets left.`
        setBtn.addEventListener('click', countSets);
        // progressBar();
      }

      startBtn.addEventListener('click', showSetButton);

  const toggleBtn = () => {
        infoDiv.classList.toggle('exfin');
        setBtn.classList.toggle('btnFin');
      }

  const resetExercise = () => {
        startBtn.style.display = "none"
        setBtn.disabled = false;
        toggleBtn();
        // progressBar();
      }
      
      let count = workout.sets;

  const countSets = () => {
        stopRest();
        progressEle.value += 1;
        
        if (count < 1) {
          setBtn.textContent = `Done 💪`
          count = workout.sets;
          setBtn.disabled = true;
          timerBtn.style.display = "none";
          showStartButton();
          toggleBtn();
          
        } else {
          setBtn.textContent = `${count--} sets left.`
          timerBtn.style.display = "block";
          timerBtn.textContent = `${restTime}'s rest left.`
          timerBtn.addEventListener('click', stopRest);
          startTime();
        }
      }
      
    let timer;
    let restTime: number = workout.rest;

    const startTime = () =>{ 
        timer = setInterval(counter, 1000);
        restTime = workout.rest;
        timerBtn.textContent = `${restTime}'s rest left.`
        timerBtn.classList.remove('restDone');
        } 

    const counter = () =>{
        restTime--;
        timerBtn.textContent = `${restTime}'s rest left.`
        
        if (restTime == 0){
          stopRest();
          timerBtn.classList.add('restDone');
          timerBtn.textContent = `Get back to work.🏋️‍♂️`;
        }
      }
      const stopRest = () => clearInterval(timer);
    }

    return (
        <div className='exerciseDiv' id={`${workout.exercise}`}>
            <div className='infoDiv' id={`${workout.exercise}info`} >
                <h2>Exercise: {workout.exercise}</h2>
                {workout.sets} sets of {workout.reps} reps{' '}
                {workout.amount && `with ${workout.amount} ${workout.type}`} <br />
                <span>Rest time:</span> {workout.rest} secs.
            </div>
            <div className='progressDiv' id={`${workout.exercise}bar`}>
                Progress:
                <progress 
                    className='progressEle' 
                    id={`${workout.exercise}progress`}
                    value="0" max={`${workout.sets}`}>
                </progress>
                <button
                    className='setBtn' 
                    id={`${workout.exercise}set`}
                    style={{
                        // To make this conditional do
                        // display: variableName ? 'block' : 'none'
                        display: 'block',
                    }}
                > 1 sets left.
                </button>
            </div>
            <button 
                className='startBtn' 
                id={`${workout.exercise}start`} 
                style={{ display: 'none' }}
                > Restart Press Ups
            </button>
            <button
                className='timerBtn' 
                id={`${workout.exercise}timer`}
                style={{ display: 'block' }}
                 > Get back to work.🏋️‍♂️
            </button>
        </div>
    );
};

export default Exercise;
