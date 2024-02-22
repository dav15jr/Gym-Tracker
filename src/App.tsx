// import { useState } from 'react'
import './index.css'

export default function App() {

  window.onload=function(){     /*---Runs once the app is loaded---*/
     
//-------------------Save Exercise inputs --------------------------------    

    const form = document.querySelector('form');
        
    form.addEventListener('submit', (e) =>  {
      e.preventDefault();
     
      const fd = new FormData(form);  // data from the form
      const obj = Object.fromEntries(fd);   //object of the form data
      const keyname = obj.exercise;   // Take the exercise name and save it to be used as the key name for local storage.
      const json = JSON.stringify(obj);    //Convert the object to a string and store it in the local storage
      localStorage.setItem(`${keyname}`, json);

      const getSets = JSON.parse(localStorage.getItem(`${keyname}`)) //Retrieve form data from local storeage and convert it back to an object 
      
//----------------------- Display Exercises ----------------

      const newDiv = document.createElement("div")
      const barDiv = document.createElement("div")
      const proBar = document.createElement("progress")
      const setBtn = document.createElement("button")
      const startBtn = document.createElement("button")
      const timerBtn = document.createElement("button")
        
      
      newDiv.id = `${keyname}`;
      barDiv.id = `${keyname}bar`;
      setBtn.id = `${keyname}set`;
      startBtn.id = `${keyname}start`;    
      startBtn.textContent = `Start ${keyname}`;
      timerBtn.id = `${keyname}timer`;
      timerBtn.style.display = "none";
      setBtn.style.display = "none";
      timerBtn.classList.add('timerBtn');
      barDiv.classList.add('barContainer');
      proBar.classList.add('bar');

      newDiv.innerHTML = `
      <div>
        <span>Exercise:</span> ${getSets.exercise}, 
        ${getSets.sets} sets of ${getSets.reps} reps
        with ${getSets.amount} ${getSets.type} 
        <span>Rest time:</span> ${getSets.rest} secs.
      </div>             
      `; 
      document.getElementById('data').appendChild(newDiv);
      document.getElementById('data').appendChild(barDiv);
      document.getElementById('data').appendChild(setBtn);
      document.getElementById('data').appendChild(startBtn);
      document.getElementById('data').appendChild(timerBtn);
      
      form.reset();
      // for (const key in getSets) {
        // newDiv.innerHTML += `
        // <div><span>${key}:</span> ${getSets[key]} </div>             
        // `;} 

//----------------------Functions--------------------

    const progressBar = () => {
          
          proBar.setAttribute("value", "0");
          proBar.setAttribute("max", `${getSets.sets}`);

          document.getElementById(`${keyname}bar`).innerText = 'Progress:' ;
          document.getElementById(`${keyname}bar`).appendChild(proBar);
        }

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
          progressBar();
        }
        
        let count = getSets.sets;

        console.log(proBar.max)

        const countSets = () => {
          stopRest();
          proBar.value += 1;
          

          if (count < 1) {
            setBtn.textContent = `You Are Done 🙌`
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
            timerBtn.textContent = `Get back to work. 💪`;
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
      <div className="inputs">
        <form className="form">
          <label htmlFor="exercise">Exercise:</label>
          <input type="text" placeholder='Enter Exercise' id="exercise" name="exercise" required></input>
          <label htmlFor="type">Type:</label>
          <select id="type" name="type" onChange={checkEx}>
            <option value="Resistance level">Resistance</option>
            <option value="Body Weight">Body Weight</option>
            <option value="Kg's">Kilo Grams (Kg's)</option>
            <option value="Lb's">Pounds (Lb's)</option>
          </select>
          <label htmlFor="amount" id='amountLabel' >Amount:</label>
          <input type="number" placeholder='Amount' id="amount" name="amount"></input>
          <label htmlFor="reps">No. of Reps:</label>
          <input type="number" placeholder='Reps' id="reps"  name="reps"></input>
          <label htmlFor="sets">No. of Sets:</label>
          <input type="number" placeholder='Sets' id="sets" name="sets" required></input>

          <label htmlFor="rest">Rest time (s):</label>
          <input type="number" placeholder='Rest Time' id="rest" name="rest" required></input>

          <button id="submit-btn" type="submit" >Save Exercise</button>

        </form>
      </div>
      <div className="data" id="data">WorkOut Plan</div>
    </>
  )
}



