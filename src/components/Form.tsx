// import './../index.css'
import defaultExercises from '../assets/defaultExercises';

export default function Form({
    setExerciseData,
    exerciseData,
    setWorkoutPlan,
    setShowSaveBTN,
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
            return
        } 
        console.log(exerciseData)
        setWorkoutPlan([...workoutPlan, exerciseData]);
        setExerciseData(defaultExerciseState);   // Set default exercise state
        // document.querySelector('form').reset(); //Reset the form    
        setWorkoutChanged(true)
        setShowSaveBTN(true)
        }

    return (
        <>
            <form className="form-group" id="ex" onSubmit={handleSubmit}>
            <div className="row justify-content-center g-3 m-3">
                <div className ="form-floating col-6 col-sm-5 col-md-3">
                    <input
                        className="form-control" 
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
                    <datalist id='data'>                  
                        {defaultExercises.map((ex, index) => (      /*go through default exercise data and populate list*/
                            <option key={index} value={ex.exercise}/>
                        ))}
                    </datalist>
                    <label htmlFor="exercise">Exercise:</label>
                </div>
                <div className ="form-floating col-6 col-sm-4 col-md-2">
                    <select 
                            className="form-control"
                            id="type" 
                            name="type" 
                            value={exerciseData.type} 
                            onChange={handleChange}>
                        <option value="resistance">Resistance</option>
                        <option value="kgs">Kilo Grams (Kg's)</option>
                        <option value="lbs">Pounds (Lb's)</option>
                        <option value="body weight">Body Weight</option>
                    </select>
                    <label htmlFor="type">Type:</label>
                </div>
                <>
                    {  //check whether the value is 'bodyWeight' to determine showing exercise amount
                    exerciseData.type !== 'body weight' && (
                        <div className ="form-floating col-3 col-sm-2 col-lg-1">
                        <input
                            className="form-control" 
                            type="number"
                            min='1'
                            placeholder="Amount"
                            id="amount"
                            name="amount"
                            onChange={handleChange}
                            value={exerciseData.amount}
                            required/>
                        <label htmlFor="amount" id="amountLabel">Amount:</label>
                        </div>
                    )
                    }
                </>
                <div className ="form-floating col-3 col-md-2">
                    <input
                        className="form-control" 
                        type="number"
                        min='1'
                        placeholder="Reps"
                        id="reps"
                        name="reps"
                        onChange={handleChange}
                        value={exerciseData.reps}
                        required
                    />
                    <label htmlFor="reps">No. of Reps:</label>
                </div>
                <div className ="form-floating col-3 col-md-2">
                    <input
                        className="form-control" 
                        type="number"
                        min='1'
                        placeholder="Sets"
                        id="sets"
                        name="sets"
                        onChange={handleChange}
                        value={exerciseData.sets}
                        required
                    />
                    <label htmlFor="sets">No. of Sets:</label>
                </div>

                <div className ="form-floating col-3 col-md-2">
                    <input
                        className="form-control" 
                        type="number"
                        min='5'
                        placeholder="Rest Time"
                        id="rest"
                        name="rest"
                        onChange={handleChange}
                        value={exerciseData.rest}
                        required
                    />
                    <label htmlFor="rest">Rest time (s):</label>
                </div>
                <div className="row justify-content-center m-3">
                    <button className="btn btn-primary col-6" style={{maxWidth: '250px'}} type="submit">
                        Add Exercise
                    </button>
                </div>
                </div>
                
            </form>
        </>
    );
}
