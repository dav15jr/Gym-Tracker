// import { useState } from 'react'
// import './index.css'
// import Exercise from './components/Exercise.jsx'

export default function Exercise(props) {

//----------------------- Create Exercise ----------------

  const {exercise, type, amount, reps, sets, rest} = props

      const infoDiv = document.createElement("div")
      const progressDiv = document.createElement("div")
      const exerciseDiv = document.createElement("div")
      const progressEle = document.createElement("progress")
      const startBtn = document.createElement("button")
      const setBtn = document.createElement("button")
      const timerBtn = document.createElement("button")
      const exeName = exercise;
        
      
      exerciseDiv.id = `${exeName}`;
      infoDiv.id = `${exeName}info`;
      progressDiv.id = `${exeName}bar`;
      setBtn.id = `${exeName}set`;
      startBtn.id = `${exeName}start`;    
      timerBtn.id = `${exeName}timer`;
      startBtn.textContent = `Start ${exeName}`;
      timerBtn.style.display = "none";
      setBtn.style.display = "none";
      timerBtn.classList.add('timerBtn');
      progressEle.classList.add('bar');
      
      infoDiv.innerHTML = `
      <div>
      <h2>Exercise: ${exercise}</h2>
      ${sets} sets of ${reps} reps
      with ${amount} ${type} <br/>
      <span>Rest time:</span> ${rest} secs.
      </div>             
      `; 
      
      document.getElementById('data').appendChild(exerciseDiv);
      document.getElementById(`${exeName}`).appendChild(infoDiv);
      document.getElementById(`${exeName}`).appendChild(progressDiv);
      document.getElementById(`${exeName}`).appendChild(startBtn);
      document.getElementById(`${exeName}`).appendChild(timerBtn);

      

//----------------------Functions--------------------

    const progressBar = () => {    // create a progress bar and add it to its div element
          progressEle.setAttribute("value", "0");
          progressEle.setAttribute("max", `${sets}`);

          document.getElementById(`${exeName}bar`).innerText = 'Progress:' ;
          document.getElementById(`${exeName}bar`).appendChild(progressEle);
          document.getElementById(`${exeName}bar`).appendChild(setBtn);
        }
               
    const showStartButton = () => {  
          startBtn.style.display = "initial";
          startBtn.textContent = `Restart ${exeName}`;
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
          progressBar();
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
          progressBar();
        }
        
        let count = sets;

    const countSets = () => {
          stopRest();
          progressEle.value += 1;
          
          if (count < 1) {
            setBtn.textContent = `Done 💪`
            count = sets;
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
      let restTime = rest;

      const startTime = () =>{ 
          timer = setInterval(counter, 1000);
          restTime = rest;
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

