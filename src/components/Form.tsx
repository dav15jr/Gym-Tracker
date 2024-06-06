// import './index.css'
import defaultExercises from '../assets/defaultExercises';

export default function Form({
    setExerciseData,
    exerciseData,
    setWorkoutPlan,
    workoutPlan,
    defaultExerciseState,
    setWorkoutChanged,
}) {
    function handleChange(event) {   //  Handle form input value change
        const {name, value } = event.target;
        setExerciseData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    } 
    const handleExe =(e) => { // Handle exercise selection, when dropdown data list is used
        const val = (e.target.value)
        const def = defaultExercises.filter((ex) => ex.exercise === val)
        setExerciseData(def[0])
    }
    const currentExercises = workoutPlan.map((workout) => workout.exercise);
    
    function handleSubmit(event) {
        event.preventDefault();
        if(currentExercises.includes(`${exerciseData.exercise}`)){    //check if the current exercise already exists
            alert('Sorry, Exercise already exists - Change name')     // Throw error to change name - to ensure no duplicates
            setExerciseData((prevData) => {
                return {
                    ...prevData,
                    exercise: '',
                };
            });
            console.log(exerciseData)
            return
        } 
        console.log(exerciseData)
        setWorkoutPlan([...workoutPlan, exerciseData]);
        setExerciseData(defaultExerciseState);   // Set default exercise state
        // document.querySelector('form').reset(); //Reset the form
        setWorkoutChanged(true)
    }


    return (
        <>
                <form className="form" id="form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="exercise">Exercise:</label>
                        <input
                            type="text"
                            list='data'
                            placeholder="Select Exercise"
                            id="exercise"
                            name="exercise"
                            onChange={handleChange}  // Handle change from typed input.
                            onInput={handleExe}     // Handle input from data list selection.
                            value={exerciseData.exercise}
                            required
                        />
                        <datalist id='data'>                                /* data list of default exercises to select */
                            {defaultExercises.map((ex, index) => (          /*go through default exercise data and populate list*/
                                <option key={index} value={ex.exercise}/>
                            ))}
                        </datalist>
                    </div>
                    <div>
                        <label htmlFor="type">Type:</label>
                        <select id="type" name="type" value={exerciseData.type} onChange={handleChange}>
                            <option value="resistance">Resistance</option>
                            <option value="kgs">Kilo Grams (Kg's)</option>
                            <option value="lbs">Pounds (Lb's)</option>
                            <option value="body weight">Body Weight</option>
                        </select>
                    </div>
                    <div>
                        {
                            //check whether the value is 'bodyWeight' to determine showing exercise amount
                            exerciseData.type !== 'body weight' && (
                                <>
                                    <label htmlFor="amount" id="amountLabel">
                                        Amount:
                                    </label>
                                    <input
                                        type="number"
                                        min='1'
                                        placeholder="Amount"
                                        id="amount"
                                        name="amount"
                                        onChange={handleChange}
                                        value={exerciseData.amount}
                                        required
                                    />
                                </>
                            )
                        }
                    </div>
                    <div>
                        <label htmlFor="reps">No. of Reps:</label>
                        <input
                            type="number"
                            min='1'
                            placeholder="Reps"
                            id="reps"
                            name="reps"
                            onChange={handleChange}
                            value={exerciseData.reps}
                            required
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="sets">No. of Sets:</label>
                        <input
                            type="number"
                            min='1'
                            placeholder="Sets"
                            id="sets"
                            name="sets"
                            onChange={handleChange}
                            value={exerciseData.sets}
                            required
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="rest">Rest time (s):</label>
                        <input
                            type="number"
                            min='5'
                            placeholder="Rest Time"
                            id="rest"
                            name="rest"
                            onChange={handleChange}
                            value={exerciseData.rest}
                            required
                        ></input>
                    </div>
                    <br></br>
                    <button id="formSubmitBtn" type="submit">
                        Add Exercise
                    </button>
                </form>
        </>
    );
}
