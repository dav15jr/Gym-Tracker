/* eslint-disable no-extra-semi */
import React from 'react';

export default function Exercise(props) {

    const {exercise, type, amount, reps, sets, rest} = props

      // const exerciseDiv =  document.getElementById(`${exercise}`);
     // const infoDiv=  document.getElementById(`${exercise}info`);
    // const progressDiv =  document.getElementById(`${exercise}bar`);
    //   const progressEle = document.createElement("progress");
      const startBtn =  document.getElementById(`${exercise}start`);    
      const setBtn =  document.getElementById(`${exercise}set`);
      const timerBtn =  document.getElementById(`${exercise}timer`);
      // formBtn.style.display = 'none';
      startBtn.textContent = `Start ${exercise}`;
      timerBtn.style.display = "none";
      setBtn.style.display = "none";
      timerBtn.classList.add('timerBtn');


const info = `
    <div>
        <h2>Exercise: ${exercise}</h2>
        ${sets} sets of ${reps} reps
        with ${amount} ${type} <br/>
        <span>Rest time:</span> ${rest} secs.
    </div>             
    `; 
    
return (
    <div name='exerciseDiv'id={`${exercise}`} >
        <div name='infoDiv' id={`${exercise}info`}>{info}</div>
        <div name='progressDiv' id={`${exercise}bar`} >
            Progress:
            <progress name='progressEle' id={`${exercise}progress`}></progress>
            <button name='setBtn' id={`${exercise}set` }></button>
        </div>
        <button name='startBtn' id={`${exercise}start`} ></button>
        <button name='timerBtn' id={`${exercise}timer`} ></button>
    </div>
)

};
// const infoDiv = document.createElement("div")
// const progressDiv = document.createElement("div")
// const exerciseDiv = document.createElement("div")
// const progressEle = document.createElement("progress")
// const startBtn = document.createElement("button")
// const setBtn = document.createElement("button")
// const timerBtn = document.createElement("button")

// exerciseDiv.id = `${exercise}`;
// infoDiv.id = `${exercise}info`;
// progressDiv.id = `${exercise}bar`;
// setBtn.id = `${exercise}set`;
// startBtn.id = `${exercise}start`;    
// timerBtn.id = `${exercise}timer`;
// //formBtn.style.display = 'none';
// startBtn.textContent = `Start ${exercise}`;
// timerBtn.style.display = "none";
// setBtn.style.display = "none";
// timerBtn.classList.add('timerBtn');
// progressEle.classList.add('bar');

// document.getElementById('data').appendChild(exerciseDiv);
// document.getElementById(`${exercise}`).appendChild(infoDiv);
// document.getElementById(`${exercise}`).appendChild(progressDiv);
// document.getElementById(`${exercise}`).appendChild(startBtn);
// document.getElementById(`${exercise}`).appendChild(timerBtn);