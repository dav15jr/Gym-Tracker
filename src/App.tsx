// import { useState } from 'react'
import './index.css'

export default function App() {


    window.onload=function(){     /*---Runs once the app is loaded---*/
     
//-------------------Save Exercise inputs --------------------------------    

    const form = document.querySelector('form');
        
    form.addEventListener('submit', (e) =>  {
        e.preventDefault();
        
        const fd = new FormData(form);  // data from the form
        const obj = Object.fromEntries(fd);   //objct of the form data

        const keyname = obj.Exercise;   // Take the exercise name and save it to be used as the key name for local storage.

        const json = JSON.stringify(obj);    //Convert the object to a string and store it in the local storage
        localStorage.setItem(`${keyname}`, json);

        const getSets = JSON.parse(localStorage.getItem(`${keyname}`)) //Retrieve form data from local storeage and convert it back to an object 
    
//----------------------- Display Exercises ----------------

        const newDiv = document.createElement("div")
        const setBtn = document.createElement("button")
        const resetBtn = document.createElement("button")
        const timerBtn = document.createElement("button")
         
        
        newDiv.id = `${keyname}`;
        setBtn.id = `${keyname}set`;
        setBtn.textContent = `Start ${keyname}`
        resetBtn.id = `${keyname}reset`;
        resetBtn.style.display = "none";      
        resetBtn.textContent = `Reset ${keyname}`;
        timerBtn.id = `${keyname}timer`;
        timerBtn.style.display = "none";
        
        for (const key in getSets) {
          newDiv.innerHTML += `
          <div><span>${key}:</span> ${getSets[key]} </div>             
          `; 
          document.getElementById('data').appendChild(newDiv);
          }  
          document.getElementById('data').appendChild(setBtn);
          document.getElementById('data').appendChild(resetBtn);
          document.getElementById('data').appendChild(timerBtn);
          
    const  showResetButton = () =>{  
          resetBtn.addEventListener('click', resetExercise);
          resetBtn.style.display = "block";
        }


    const toggleBtn = () =>{
          element.classList.toggle('exfin');
          setChange.classList.toggle('btnFin');
        }

    const resetExercise = () => {
          resetBtn.style.display = "none"
          setChange.textContent = `${count--} sets left.`
          setBtn.disabled = false;
          toggleBtn();

        }
        
        const setChange = document.querySelector(`#${keyname}set`);
        const element = document.querySelector(`#${keyname}`);
        let count = getSets.Sets;
        
        const countSets = () => {
          if (count < 1) {
            setChange.textContent = `You Are Done 🙌`
            count = getSets.Sets;
            setBtn.disabled = true;
            timerBtn.style.display = "none";
            showResetButton();
            toggleBtn();
            
          } else {
            setChange.textContent = `${count--} sets left.`
            timerBtn.textContent = `Start Rest Timer.`
            timerBtn.style.display = "block";
            timerBtn.addEventListener('click', addTimer);

          }
        }
        setBtn.addEventListener('click', countSets);

      const addTimer = () => {
          let restTime = 10;

          const timer = setInterval(function() {

            restTime--;
            console.log(restTime);
            timerBtn.textContent = `${restTime}'s rest left.`

              if (restTime === 0) {
                clearInterval(timer);
                console.log("Time's up!");
                timerBtn.textContent = `Get back to work. 💪`
              }
            
            }, 1000);
      }

  }) 
}


  return (
    <>
      <h1>Gym Tracker</h1>
      <div className="inputs">
        <form className="form">
          <label htmlFor="Exercise">Exercise:</label>
          <input type="text" placeholder='Enter Exercise' id="Exercise" name="Exercise" required></input>
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
          <input type="number" placeholder='Sets' id="Sets" name="Sets" required></input>
          <button id="submit-btn" type="submit" >Save Exercise</button>
        </form>
      </div>
      <div className="data" id="data">
      </div>
    </>
  )
}


