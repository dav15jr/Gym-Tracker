import { useState } from 'react'
// import Exercise from './components/Exercise.jsx'
import './index.css'

export default function App() {

  interface formData {        /* Create type declaration for the form */
      exercise: string;
      type: string;
      amount: number;
      reps: number;
      sets: number;
    }
      
  const [formData, setFormData] = useState(
        {
        exercise: "", 
        type: "", 
        amount: 0, 
        reps: 0, 
        sets: 0,
        rest: 0
      }
    )

    function handleSubmit(event) {
      event.preventDefault()
      // submitToApi(formData)
      setFormData(formData);

      const json = JSON.stringify(formData);    //Convert the object to a string and store it in the local storage
      localStorage.setItem(`${formData.exercise}`, json);

      console.log(formData)

      // const form = document.getElementById('form');
      
      onreset;
    }

    function handleChange(event) {
      const {name, value} = event.target
      setFormData(prevFormData => {
          console.log(formData)
          return {
              ...prevFormData,
              [name]: value
          }
      })
    }

     
//-------------------Save Exercise inputs --------------------------------    

//     // const form = document.querySelector('form');
    
//     const formBtn = document.getElementById('formBtn');
//     formBtn.style.display = 'none';


// //----------------------- Display Exercises ----------------

//     const startBtn =  document.getElementById(`${formData.exercise}start`);    
//     const setBtn =  document.getElementById(`${formData.exercise}}set`);
//     const timerBtn =  document.getElementById(`${formData.exercise}}timer`);
//     // const progressEle =  document.getElementById(`${formData.exercise}}progress`);
//     // formBtn.style.display = 'none';
//     startBtn.textContent = `Start ${formData.exercise}}`;
//     timerBtn.style.display = "none";
//     setBtn.style.display = "none";
//     timerBtn.classList.add('timerBtn');
    
    
    
    // const progressBar = () => {  // create a progress bar and add it to its div element

    //     progressEle.setAttribute("value", "0");
    //     progressEle.setAttribute("max", `${formData.sets}`);
    //     progressEle.classList.add('bar');
    //       // document.getElementById(`${exercise}bar`).innerText = 'Progress:' ;
    //       // document.getElementById(`${exercise}bar`).appendChild(progressEle);
    //       // document.getElementById(`${exercise}bar`).appendChild(setBtn);
    //     }
        
    // const hideForm = () => {
    //       if(form.style.display === "none") {
    //         form.style.display = "inline-flex";
    //         formBtn.style.display = 'none';
    //       } else { 
    //         form.style.display = "none";
    //         formBtn.style.display = 'block';
    //       }
    //     }
    //     formBtn.addEventListener('click', hideForm);
        
    // const showStartButton = () => {  
    //       startBtn.style.display = "initial";
    //       startBtn.textContent = `Restart ${formData.exercise}`;
    //       startBtn.addEventListener('click', resetExercise);
    //     }
        
    // const showSetButton = () => {  
    //       startBtn.style.display = "none";
    //       setBtn.style.display = "block";
    //       setBtn.textContent = `${count--} sets left.`
    //       setBtn.addEventListener('click', countSets);
    //       progressBar();
    //       formBtn.style.display = 'block';
    //       form.style.display = "none"
    //     }

    //       startBtn.addEventListener('click', showSetButton);

    // const toggleBtn = () => {
    //       const infoDiv=  document.getElementById(`${formData.exercise}info`);
    //       infoDiv.classList.toggle('exfin');
    //       setBtn.classList.toggle('btnFin');
    //     }

    // const resetExercise = () => {
    //       startBtn.style.display = "none"
    //       // setBtn.disabled = false;
    //       toggleBtn();
    //       progressBar();
    //     }
        
    //     let count = formData.sets;

    // const countSets = () => {
    //       stopRest();
    //       // progressEle.value += 1;

    //       if (count < 1) {
    //         setBtn.textContent = `Done 💪`
    //         count = formData.sets;
    //         // setBtn.disabled = true;
    //         timerBtn.style.display = "none";
    //         showStartButton();
    //         toggleBtn();
            
    //       } else {
    //         setBtn.textContent = `${count--} sets left.`
    //         timerBtn.style.display = "block";
    //         timerBtn.textContent = `${restTime}'s rest left.`
    //         timerBtn.addEventListener('click', stopRest);
    //         startTime();
    //       }
    //     }
        
    //   let timer;
    //   let restTime = formData.rest;

    //   function startTime(){ 
    //     timer = setInterval(counter, 1000);
    //     restTime = formData.rest;
    //     timerBtn.textContent = `${restTime}'s rest left.`
    //     timerBtn.classList.remove('restDone');
    //     } 

  //     function counter(){
  //         restTime--;
  //         timerBtn.textContent = `${restTime}'s rest left.`
          
  //         if (restTime == 0){
  //           stopRest();
  //           timerBtn.classList.add('restDone');
  //           timerBtn.textContent = `Get back to work.🏋️‍♂️`;
  //         }
  //       }
  //       const stopRest = () => clearInterval(timer);

    
    const checkEx = () => {        // check whether body weight has been selected and remove the amount option.
      const option = (document.getElementById("type") as HTMLInputElement).value;
     
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
        <button type="button" id="formBtn" hidden>Add New Exercise</button>
        <form className="form" id="form" onSubmit={handleSubmit}>
          <div> 
          <label htmlFor="exercise">Exercise:</label>
          <input type="text" placeholder='Enter Exercise' id="exercise" onChange={handleChange} name="exercise"  required></input>
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
          <input type="number" placeholder='Amount' id="amount" name="amount" onChange={handleChange} value={formData.amount}></input>
          </div>
          <div>
          <label htmlFor="reps">No. of Reps:</label>
          <input type="number" placeholder='Reps' id="reps"  name="reps" onChange={handleChange} value={formData.reps}></input>
          </div>
          <div>
          <label htmlFor="sets">No. of Sets:</label>
          <input type="number" placeholder='Sets' id="sets" name="sets" onChange={handleChange} value={formData.sets} required></input>
          </div>
          <div>
          <label htmlFor="rest">Rest time (s):</label>
          <input type="number" placeholder='Rest Time' id="rest" name="rest"  onChange={handleChange} value={formData.rest} required></input>
          </div>
          <br></br>
          <button id="submit-btn" type="submit">Save Exercise</button>
        </form>
      </div>
      <div className="data" id="data"></div>
      {/* <Exercise props={formData} /> */}
    </>
  )
}

