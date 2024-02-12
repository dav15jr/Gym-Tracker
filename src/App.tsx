import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Gym Tracker</h1>
      <div className="card">
        <form className="form">
          Exercise:
          <input type="text" placeholder='Enter Exercise'></input>
          <select>
            <option value="bw">Body Weight</option>
            <option value="resistance">Resistance</option>
            <option value="kg">Kilo Grams (Kg's)</option>
            <option value="lb">Pounds (Lb's)</option>
          </select>
          <input type="number" placeholder='Amount'></input>
          <input type="number" placeholder='Reps'></input>
          <input type="number" placeholder='Sets'></input>
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
