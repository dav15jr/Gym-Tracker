import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Gym Tracker</h1>
      <div className="card">
        <form className="form">
          <label for="exercise">Exercise:</label>
          <input type="text" placeholder='Enter Exercise' name="exercise" id="exercise"></input>
          <label for="ex-type">Exercise Type:</label>
          <select name="ex-type">
            <option value="bw">Body Weight</option>
            <option value="resistance">Resistance</option>
            <option value="kg">Kilo Grams (Kg's)</option>
            <option value="lb">Pounds (Lb's)</option>
          </select>
          <label for="amount">Amount:</label>
          <input type="number" placeholder='Amount' name="amount"></input>
          <label for="reps">No. of Reps:</label>
          <input type="number" placeholder='Reps' name="reps"></input>
          <label for="sets">No. of Sets:</label>
          <input type="number" placeholder='Sets' name="sets"></input>
          <button id="submit-btn" type="submit" >Save Exercise</button>
        </form>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      
    </>
  )
}

export default App
