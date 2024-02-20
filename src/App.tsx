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
        const startBtn = document.createElement("button")
        const timerBtn = document.createElement("button")
         
        
        newDiv.id = `${keyname}`;
        setBtn.id = `${keyname}set`;
        startBtn.id = `${keyname}start`;    
        startBtn.textContent = `Start ${keyname}`;
        timerBtn.id = `${keyname}timer`;
        timerBtn.style.display = "none";
        setBtn.style.display = "none";
        
        for (const key in getSets) {
          newDiv.innerHTML += `
          <div><span>${key}:</span> ${getSets[key]} </div>             
          `; 
          document.getElementById('data').appendChild(newDiv);
          }  
          document.getElementById('data').appendChild(setBtn);
          document.getElementById('data').appendChild(startBtn);
          document.getElementById('data').appendChild(timerBtn);
          
          
    const  showStartButton = () =>{  
          startBtn.style.display = "block";
          startBtn.textContent = `Restart ${keyname}`;
          startBtn.addEventListener('click', resetExercise);
        }
        
    const  showSetButton = () =>{  
          startBtn.style.display = "none";
          setBtn.style.display = "block";
          setBtn.textContent = `${count--} sets left.`
          setBtn.addEventListener('click', countSets);
        }

    startBtn.addEventListener('click', showSetButton);

    const toggleBtn = () => {
          const element = document.querySelector(`#${keyname}`);
          element.classList.toggle('exfin');
          setBtn.classList.toggle('btnFin');
        }

        
        const resetExercise = () => {
          startBtn.style.display = "none"
          setBtn.disabled = false;
          toggleBtn();
          
        }
        
        let count = getSets.Sets;
        
        const countSets = () => {
          stopRest();

          if (count < 1) {
            setBtn.textContent = `You Are Done 🙌`
            count = getSets.Sets;
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
      let restTime = getSets.Rest;

      function startTime(){ 
        timer = setInterval(counter, 1000);
        restTime = getSets.Rest;
        timerBtn.textContent = `${restTime}'s rest left.`
        timerBtn.classList.remove('restDone');
      } 

        function counter(){
          restTime--;
          timerBtn.textContent = `${restTime}'s rest left.`
          console.log(restTime);
          
          if (restTime == 0){
            stopRest();

            timerBtn.classList.add('restDone');
            timerBtn.textContent = `Get back to work. 💪`;
          }
        }

        const stopRest = () => clearInterval(timer);
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

          <label htmlFor="Rest">Rest time (s):</label>
          <input type="number" placeholder='Rest Time' id="Rest" name="Rest" required></input>

          <button id="submit-btn" type="submit" >Save Exercise</button>

        </form>
      </div>
      <div className="data" id="data">
      </div>
    </>
  )
}


