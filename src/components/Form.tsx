import { useState } from 'react'
// import './index.css'
import Exercise from './Exercise.jsx'


export default function App() {

  interface exerciseData {        /* Create type declaration for the form */
    exercise: string;
    type: string;
    amount: number;
    reps: number;
    sets: number;
    rest: number;
}
  
const [exerciseData, setExerciseData] = useState(
    {
    exercise: "", 
    type: "", 
    amount: undefined, 
    reps: undefined, 
    sets: undefined,
    rest: undefined
  }
)

function handleChange(event) {
  const {name, value} = event.target
  setExerciseData(prevFormData => {
      return {
          ...prevFormData,
          [name]: value
      }
  })
}

function handleSubmit(event) {
  event.preventDefault()
  
  setExerciseData(exerciseData);  // update the state of the form data 
  
  const json = JSON.stringify(exerciseData);    //Convert the object to a string and store it in the local storage
  localStorage.setItem(`${exerciseData.exercise}`, json); //Store the form data in local storage
  
  Exercise(exerciseData)            // Create a new exercise
  
  setExerciseData(
    {
    exercise: "", 
    type: "", 
    amount: undefined, 
    reps: undefined, 
    sets: undefined,
    rest: undefined
  })
  form.reset();
  
} 

const formBtn = document.getElementById('formBtn');
const form = document.querySelector('form');

    const hideForm = () => {
      if(form.style.display === "none") {
        form.style.display = "inline-flex";
        formBtn.style.display = 'none';
      } else { 
        form.style.display = "none";
        formBtn.style.display = 'block';
      }
    }
    
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
        <button type="button" id="formBtn" onClick={hideForm} hidden>Add New Exercise</button>
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
          <input type="number" placeholder='Amount' id="amount" name="amount" onChange={handleChange} value={exerciseData.amount}></input>
          </div>
          <div>
          <label htmlFor="reps">No. of Reps:</label>
          <input type="number" placeholder='Reps' id="reps"  name="reps" onChange={handleChange} value={exerciseData.reps}></input>
          </div>
          <div>
          <label htmlFor="sets">No. of Sets:</label>
          <input type="number" placeholder='Sets' id="sets" name="sets" onChange={handleChange} value={exerciseData.sets} required></input>
          </div>
          <div>
          <label htmlFor="rest">Rest time (s):</label>
          <input type="number" placeholder='Rest Time' id="rest" name="rest"  onChange={handleChange} value={exerciseData.rest} required></input>
          </div>
          <br></br>
          <button id="submit-btn" type="submit">Save Exercise</button>
        </form>
      </div>
      <div className="data" id="data"></div>
    </>
  )
}