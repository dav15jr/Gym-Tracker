// import { useState } from 'react'
import './index.css'

export default function App() {

  window.onload=function(){     /*---Runs once the app is loaded---*/
     
//-------------------Save Exercise inputs --------------------------------    

    const form = document.querySelector('form');
    const formBtn = document.getElementById('formBtn');
    formBtn.style.display = 'none';

    form.addEventListener('submit', (e) =>  {
      e.preventDefault();
     
      const fd = new FormData(form);  // data from the form
      const obj = Object.fromEntries(fd);   //object of the form data
      const keyname = obj.exercise;   // Take the exercise name and save it to be used as the key name for local storage.
      const json = JSON.stringify(obj);    //Convert the object to a string and store it in the local storage
      localStorage.setItem(`${keyname}`, json);

      const getSets = JSON.parse(localStorage.getItem(`${keyname}`)) //Retrieve form data from local storeage and convert it back to an object 
      
//----------------------- Display Exercises ----------------

      const infoDiv = document.createElement("div")
      const progressDiv = document.createElement("div")
      const exerciseDiv = document.createElement("div")
      const progressEle = document.createElement("progress")
      const startBtn = document.createElement("button")
      const setBtn = document.createElement("button")
      const timerBtn = document.createElement("button")
      
        
      
      exerciseDiv.id = `${keyname}`;
      infoDiv.id = `${keyname}info`;
      progressDiv.id = `${keyname}bar`;
      setBtn.id = `${keyname}set`;
      startBtn.id = `${keyname}start`;    
      timerBtn.id = `${keyname}timer`;
      formBtn.style.display = 'none';
      startBtn.textContent = `Start ${keyname}`;
      timerBtn.style.display = "none";
      setBtn.style.display = "none";
      timerBtn.classList.add('timerBtn');
      progressDiv.classList.add('barContainer');
      progressEle.classList.add('bar');
      
      infoDiv.innerHTML = `
      <div>
      <h2>Exercise: ${getSets.exercise}</h2>
      ${getSets.sets} sets of ${getSets.reps} reps
      with ${getSets.amount} ${getSets.type} <br/>
      <span>Rest time:</span> ${getSets.rest} secs.
      </div>             
      `; 
      
      document.getElementById('data').appendChild(exerciseDiv);
      document.getElementById(`${keyname}`).appendChild(infoDiv);
      document.getElementById(`${keyname}`).appendChild(progressDiv);
      document.getElementById(`${keyname}`).appendChild(startBtn);
      document.getElementById(`${keyname}`).appendChild(timerBtn);
      

      
      form.reset();
      // for (const key in getSets) {
        // infoDiv.innerHTML += `
        // <div><span>${key}:</span> ${getSets[key]} </div>             
        // `;} 

//----------------------Functions--------------------

    const progressBar = () => {    // create a progress bar and add it to its div element
          progressEle.setAttribute("value", "0");
          progressEle.setAttribute("max", `${getSets.sets}`);

          document.getElementById(`${keyname}bar`).innerText = 'Progress:' ;
          document.getElementById(`${keyname}bar`).appendChild(progressEle);
          document.getElementById(`${keyname}bar`).appendChild(setBtn);
        }
        
        const hideForm = () => {

          if(form.style.display === "none") {
            form.style.display = "inline-flex";
            formBtn.style.display = 'none';
          } else { 
            form.style.display = "none";
            formBtn.style.display = 'block';
          }
        }
        formBtn.addEventListener('click', hideForm);
        
        const  showStartButton = () => {  
          startBtn.style.display = "initial";
          startBtn.textContent = `Restart ${keyname}`;
          startBtn.addEventListener('click', resetExercise);
        }
        
        const  showSetButton = () => {  
          startBtn.style.display = "none";
          setBtn.style.display = "block";
          setBtn.textContent = `${count--} sets left.`
          setBtn.addEventListener('click', countSets);
          progressBar();
          // hideForm();
          formBtn.style.display = 'block';
          form.style.display = "none"
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
        
        let count = getSets.sets;

        const countSets = () => {
          stopRest();
          progressEle.value += 1;
          

          if (count < 1) {
            setBtn.textContent = `Done 💪`
            count = getSets.sets;
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
      let restTime = getSets.rest;

      function startTime(){ 
        timer = setInterval(counter, 1000);
        restTime = getSets.rest;
        timerBtn.textContent = `${restTime}'s rest left.`
        timerBtn.classList.remove('restDone');
        } 

        function counter(){
          restTime--;
          timerBtn.textContent = `${restTime}'s rest left.`
          
          if (restTime == 0){
            stopRest();
            timerBtn.classList.add('restDone');
            timerBtn.textContent = `Get back to work.🏋️‍♂️`;
          }
        }

        const stopRest = () => clearInterval(timer);

      }) 
      
    }
    
    
    const checkEx = () => {        // check whether body weight has been selected and remove the amount option.
      const option = (document.getElementById("type") as HTMLInputElement).value;
      console.log(option)
   
      if(option === "Body Weight") {
        document.getElementById("amountLabel").style.display = "none";
        document.getElementById("amount").style.display = "none";
        (document.getElementById("amount") as HTMLInputElement).value = '';   //clear the amount inputfield
      } else {
        document.getElementById("amountLabel").style.display = "initial";
        document.getElementById("amount").style.display = "initial";
        
      }

}
  return (
    <>
      <h1>Gym Tracker</h1>
      <div className="inputs" id="inputs">
        <button type="button" id="formBtn" >Add New Exercise</button>
        <form className="form">
          <div> 
          <label htmlFor="exercise">Exercise:</label>
          <input type="text" placeholder='Enter Exercise' id="exercise" name="exercise" required></input>
          </div>
          <div>
          <label htmlFor="type">Type:</label>
          <select id="type" name="type" onChange={checkEx}>
            <option value="Resistance level">Resistance</option>
            <option value="Body Weight">Body Weight</option>
            <option value="Kg's">Kilo Grams (Kg's)</option>
            <option value="Lb's">Pounds (Lb's)</option>
          </select>
          </div>
          <div>
          <label htmlFor="amount" id='amountLabel' >Amount:</label>
          <input type="number" placeholder='Amount' id="amount" name="amount"></input>
          </div>
          <div>
          <label htmlFor="reps">No. of Reps:</label>
          <input type="number" placeholder='Reps' id="reps"  name="reps"></input>
          </div>
          <div>
          <label htmlFor="sets">No. of Sets:</label>
          <input type="number" placeholder='Sets' id="sets" name="sets" required></input>
          </div>
          <div>
          <label htmlFor="rest">Rest time (s):</label>
          <input type="number" placeholder='Rest Time' id="rest" name="rest" required></input>
          </div>
          <br></br>
          <button id="submit-btn" type="submit" >Save Exercise</button>

        </form>
      </div>
      <div className="data" id="data"></div>
    </>
  )
}



