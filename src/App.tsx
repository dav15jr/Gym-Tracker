// import { useState } from 'react'
import './index.css'

export default function App() {


    window.onload=function(){     /*---Runs once the app is loaded---*/
     
//-------------------Save Exercise inputs --------------------------------    

    const form = document.querySelector('form');
        
    form.addEventListener('submit', (e) =>  {
        e.preventDefault();
        
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
        const setBtn = document.createElement("button")
        newDiv.className = `${keyname}`;
        newDiv.id = `${keyname}`;
        newBtn.id = `${keyname}btn`;
        newBtn.className = `${keyname}btn`;
        setBtn.className = `${keyname}set`;

        setBtn.textContent = `Set left ${data.Sets}`
        newBtn.textContent = `Finish ${keyname}`;
        

        for (const key in data) {
            newDiv.innerHTML += `
              <div><span>${key}:</span> ${data[key]} </div>             
              `; 
              document.getElementById('data').appendChild(newDiv);
              document.getElementById('data').appendChild(newBtn);
              document.getElementById('data').appendChild(setBtn);

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
        })

        
        const Counter = () => {
          
          const sets = 0;
          // let setsDone += start;
          // setsDone ++;
          let setsLeft = data.Sets--;
          
          console.log(setsLeft);

          const setChange = document.querySelector(`.${keyname}set`)
          // setChange.textContent = `Sets done ${setsLeft}`

          if (sets === setsLeft) {

            setChange.textContent = `You Are Done`
            setsLeft = data.Sets++
          } else {

            setChange.textContent = `Sets done ${setsLeft}`

          }

        }

        setBtn.addEventListener('click', Counter);

        // setBtn.addEventListener('click', function () {
          
        //     Counter();
        //   const setChange = document.querySelector(`.${keyname}set`)

        //   console.log(sets);

        //   setSets(sets - 1)

        //   setChange.textContent = `Sets left ${sets}`
        // })

      }) 

}
  // function finishExercise(){
  //   const element = document.querySelector('.Dass');
  //   element.classList.toggle('exfin');
  // }

  // const Counter = () => {
    
  //   setSets(sets - 1)

  //   console.log(sets);

  //   const setChange = document.querySelector(`.${keyname}set`)
  //   setChange.textContent = `Sets left ${sets}`

  //   const element = document.querySelector('.Dass');
  //   element.textContent = `Sets left ${sets}`

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
      {/* <button type="button" onClick={Counter}>Click Me!</button> */}
      <div className="data" id="data">
      </div>
    </>
  )
}

