// import { useState } from 'react'
import './index.css'

export default function App() {

    window.onload=function(){     /*---Runs once the app is loaded---*/
     
//-------------------Save Exercise inputs --------------------------------    
    
    const form = document.querySelector('form');
        
    form.addEventListener('submit', (e) =>  {
        e.preventDefault();
        
        // let oldItems = JSON.parse(localStorage.getItem("form"));
        // if(oldItems == null) oldItems = [];

        const fd = new FormData(form);
        const obj = Object.fromEntries(fd);

        const keyname = obj.Exercise;   // Take the exercise name and save it to be used as the key name for local storage.

        const json = JSON.stringify(obj);
        localStorage.setItem(`${keyname}`, json);

        const exlist = localStorage.getItem(`${keyname}`);
        const data = JSON.parse(exlist);

        console.log(data);

//----------------------- Display Exercises ----------------

        const newDiv = document.createElement("div")
        const newBtn = document.createElement("button")
        newDiv.className = `${keyname}`;
        newDiv.id = `${keyname}`;
        newBtn.id = `${keyname}btn`;
        newBtn.className = `${keyname}btn`;
        
        newBtn.textContent = `Finish ${keyname}`;
        

        for (const key in data) {
            newDiv.innerHTML += `
              <div><span>${key}:</span> ${data[key]} </div>             
              `; 
              document.getElementById('data').appendChild(newDiv);
              document.getElementById('data').appendChild(newBtn);
            }  
    
        newBtn.addEventListener('click', function () {
          
          const element = document.querySelector(`.${keyname}`);
          const btnChange = document.querySelector(`.${keyname}btn`);
          element.classList.toggle('exfin');
          btnChange.classList.toggle('btnFin');


          if (newBtn.textContent.includes('Finish')) {
          newBtn.textContent = `Reset ${keyname}`;

        } else {
          newBtn.textContent = `Finish ${keyname}`;
          }

        });
      })
  }

  // const buttonToggle = document.querySelector('.toggle');
  // buttonToggle.addEventListener('click', toggleClass);

  function finishExercise(){
    const element = document.querySelector('.Dass');
    element.classList.toggle('exfin');
  }
// function finishedExercise(){
//   document.getElementById('Deadlift').style = 'exfin'
// }

  

  return (
    <>
      <h1>Gym Tracker</h1>
      <div className="inputs">
        <form className="form">
          <label htmlFor="Exercise">Exercise:</label>
          <input type="text" placeholder='Enter Exercise' id="Exercise" name="Exercise"></input>
          <label htmlFor="Type">Exercise Type:</label>
          <select id="Type" name="Type">
            <option value="Body Weight">Body Weight</option>
            <option value="Resistance">Resistance</option>
            <option value="Kgs">Kilo Grams (Kg's)</option>
            <option value="Lbs">Pounds (Lb's)</option>
          </select>
          <label htmlFor="Amount">Amount:</label>
          <input type="number" placeholder='Amount' id="Amount" name="Amount"></input>
          <label htmlFor="Reps">No. of Reps:</label>
          <input type="number" placeholder='Reps' id="Reps"  name="Reps"></input>
          <label htmlFor="Sets">No. of Sets:</label>
          <input type="number" placeholder='Sets' id="Sets" name="Sets"></input>
          <button id="submit-btn" type="submit" >Save Exercise</button>
        </form>
      </div>
      <button type="button" onClick={finishExercise}>Click Me!</button>
      <div className="data" id="data">
      </div>
    </>
  )
}
