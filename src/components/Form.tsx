// import './index.css'

export default function Form({
    setExerciseData,
    exerciseData,
    setWorkoutPlan,
    workoutPlan,
    defaultExerciseState,
}) {
    // Setting to strings because if it was undefined, it thinks we are going from a
    // uncontrolled -> controlled component
    function handleChange(event) {
        const { name, value } = event.target;
        setExerciseData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    }
    const formBtn = document.getElementById('formBtn');
    const form = document.querySelector('form');

    function handleSubmit(event) {
        event.preventDefault();

        const json = JSON.stringify(exerciseData);   //Convert the object to a string and store it in the local storage
        localStorage.setItem(`${exerciseData.exercise}`, json);

        setWorkoutPlan([...workoutPlan, exerciseData]);

        setExerciseData(defaultExerciseState);
        form.reset();
    }


    const hideForm = () => {
        if (form.style.display === 'none') {
            form.style.display = 'inline-flex';
            formBtn.style.display = 'none';
        } else {
            form.style.display = 'none';
            formBtn.style.display = 'block';
        }
    };

    return (
        <>
            <div className="inputs" id="inputs">
                <button 
                    type="button" 
                    id="formBtn" 
                    onClick={hideForm} 
                    hidden>
                    Add New Exercise
                </button>
                <form className="form" id="form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="exercise">Exercise:</label>
                        <input
                            type="text"
                            placeholder="Enter Exercise"
                            id="exercise"
                            onChange={handleChange}
                            name="exercise"
                            required
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="type">Type:</label>
                        <select id="type" name="type" onChange={handleChange}>
                            <option value="resistance">Resistance</option>
                            <option value="body weight">Body Weight</option>
                            <option value="kgs">Kilo Grams (Kg's)</option>
                            <option value="lbs">Pounds (Lb's)</option>
                        </select>
                    </div>
                    <div>
                        {
                            // As exerciseData.type is in the state, we can use it to check whether the value is 'bodyWeight'
                            exerciseData.type !== 'body weight' && (
                                <>
                                    <label htmlFor="amount" id="amountLabel">
                                        Amount:
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Amount"
                                        id="amount"
                                        name="amount"
                                        onChange={handleChange}
                                        value={exerciseData.amount}
                                    />
                                </>
                            )
                        }
                    </div>
                    <div>
                        <label htmlFor="reps">No. of Reps:</label>
                        <input
                            type="number"
                            placeholder="Reps"
                            id="reps"
                            name="reps"
                            onChange={handleChange}
                            value={exerciseData.reps}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="sets">No. of Sets:</label>
                        <input
                            type="number"
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
                            placeholder="Rest Time"
                            id="rest"
                            name="rest"
                            onChange={handleChange}
                            value={exerciseData.rest}
                            required
                        ></input>
                    </div>
                    <br></br>
                    <button id="submit-btn" type="submit">
                        Save Exercise
                    </button>
                </form>
            </div>
        </>
    );
}
