// import { useState } from 'react'
import './App.css'

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

        const keyname = obj.exercise;   // Take the exercise name and save it to be used as the key name for local storage.

        const json = JSON.stringify(obj);
        localStorage.setItem(`${keyname}`, json);

        const exlist = localStorage.getItem(`${keyname}`);
        const data = JSON.parse(exlist);

        console.log(data);

//----------------------- Display Exercises ----------------

           for (const key in data) {
                            
                  const markup= `            
                  <div>
                    <span>${key}: ${data[key]}</span>
                  </div>
                  `;
                  document.getElementById('data').innerHTML += markup;

             }
    })
  }

  return (
    <>
      <div className="card">
      <h1>Gym Tracker</h1>
        <form className="form">
          <label htmlFor="exercise">Exercise:</label>
          <input type="text" placeholder='Enter Exercise' id="exercise" name="exercise"></input>
          <label htmlFor="ex-type">Exercise Type:</label>
          <select id="type" name="type">
            <option value="Body Weight">Body Weight</option>
            <option value="Resistance">Resistance</option>
            <option value="Kgs">Kilo Grams (Kg's)</option>
            <option value="Lbs">Pounds (Lb's)</option>
          </select>
          <label htmlFor="amount">Amount:</label>
          <input type="number" placeholder='Amount' id="amount" name="amount"></input>
          <label htmlFor="reps">No. of Reps:</label>
          <input type="number" placeholder='Reps' id="reps"  name="reps"></input>
          <label htmlFor="sets">No. of Sets:</label>
          <input type="number" placeholder='Sets' id="sets" name="sets"></input>
          <button id="submit-btn" type="submit" >Save Exercise</button>
        </form>
      </div>
      <div id="data">
      </div>
    </>
  )
}

// window.onload=function(){     /*---Runs once the app is loaded---*/
// const form = document.querySelector('form');

// form.addEventListener('submit', (e) =>  {
//   e.preventDefault();
  
//   // const exlist = localStorage.getItem('form')
//   // const data = JSON.parse(exlist);
//   // const exArr = [];
//   // exArr.push(data);  
//   // console.log(exArr);

//   const fd = new FormData(form);
//   const obj = Object.fromEntries(fd);
//   const json = JSON.stringify(obj);
//   localStorage.setItem('form', json);

//   const exlist = localStorage.getItem('form');
//   const data = JSON.parse(exlist);
  
//   for (const key in data) {
//       const markup= `            
//       <div>
//         <span>${key}: ${data[key]} </span>
//       </div>
//       `;
//   document.getElementById('data').innerHTML += markup;

// }
// })
// }