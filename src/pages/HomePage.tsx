import { useState} from 'react';
import { useAppContext } from '../assets/AppContext';
import NavBar from '../components/NavBar';
import Profile from '../components/Profile';
import LoadWorkouts from '../components/LoadWorkouts';
import SaveWorkout from '../components/SaveWorkout';
import Form from '../components/Form';
// import Exercise from '../components/Exercise';
import Exercise from '../components/Exercise BS';
import useSetWorkoutTitle from '../assets/hooks/useSetWorkoutTitle'; 
// import LoginPage from '../pages/LoginPage';
// import '../index.css';

const defaultExerciseState = {
    exercise: '',
    type: 'resistance',
    amount: 0,
    reps: 0,
    sets: 0,
    rest: 0,

};
const HomePage = () => {
    const { userID, isLoggedIn, newUser} = useAppContext();

    // I have moved the state up so that it can be shared with <Exercise /> component
    const [exerciseData, setExerciseData] = useState(defaultExerciseState);
    const [showSaveBTN, setShowSaveBTN] = useState(false);
    const [workoutName, setWorkoutName] = useState('');
    const [workoutPlan, setWorkoutPlan] = useState([]);
    const [workoutChanged, setWorkoutChanged] = useState(false);
    const [showExercises, setShowExercises] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [userName, setUserName] = useState('');



    const { showWorkoutTitle, setShowWorkoutTitle } = useSetWorkoutTitle(workoutPlan)
  
    console.log('Home page rendered')
    console.log('isLoggedIn is', isLoggedIn)
    console.log('are they a new user ?', newUser)

useSetWorkoutTitle(workoutPlan);  //custom hook to set whether the Workout title should be shown or hidden.

//------------------------------Edit Workout--------------------

const deleteExercise = (index: number) => {      //Takes the index of the current clicked exercise and checks if it exists in the current workoutPlan. 
    setWorkoutPlan(oldPlan => {                 //updates the state of the workoutPlan
        return oldPlan.filter((_, currentIndex) => currentIndex !== index)      //filters for indexs that don't match and sends them to the current workoutPlan. Uses underscore as the first argument to indicate an unused argument.
    }) 
    setWorkoutChanged(true)
    setShowSaveBTN(true)
}
return (
        <>
            <div>
                <NavBar
                    setWorkoutPlan = {setWorkoutPlan}
                    setShowForm = {setShowForm}
                    setUserName ={setUserName}
                    setShowExercises = {setShowExercises}
                />
                <Profile 
                    userName ={userName}
                    setUserName ={setUserName}
                    setShowExercises = {setShowExercises}
                    newUser = {newUser}
                />
                {showExercises && (
                showForm ? 
                (<Form
                    setExerciseData={setExerciseData}
                    exerciseData={exerciseData}
                    setShowSaveBTN={setShowSaveBTN}
                    setWorkoutPlan={setWorkoutPlan}
                    workoutPlan={workoutPlan}
                    defaultExerciseState={defaultExerciseState}
                    setWorkoutChanged ={setWorkoutChanged}
                />):(<button 
                    className='btn btn-primary m-2'
                    // id="showFormBtn" 
                    onClick={()=> (setShowForm(true))} 
                    >Add New Exercise
                </button>)  
                  )}
                <div className='loadsave row m-3'>
                <LoadWorkouts 
                    userID ={userID}
                    setShowSaveBTN = {setShowSaveBTN}
                    setWorkoutName = {setWorkoutName}
                    setWorkoutPlan = {setWorkoutPlan}
                    setShowWorkoutTitle = {setShowWorkoutTitle}
                    />
                </div>
                <div>
                {(showWorkoutTitle) && <h2 className='workoutTitle mt-5'>
                    {workoutChanged ? 'Save Updated Workout?' : workoutName}</h2>}
                    {(showSaveBTN && workoutPlan.length > 1) &&
                        <SaveWorkout 
                        userID ={userID}
                        setShowSaveBTN = {setShowSaveBTN}
                        setWorkoutName = {setWorkoutName}
                        workoutPlan = {workoutPlan}
                        setWorkoutChanged = {setWorkoutChanged}
                        setShowWorkoutTitle = {setShowWorkoutTitle}
                        />
                        } 
                    <div className='workoutDiv m-3' >
                        {
                        // If the workout plan array has a length then loop through the Exercise component and return a seperate copy of that component
                        workoutPlan.length > 0 &&
                            workoutPlan.map((workout, index) => {
                            return <Exercise 
                            key={workout.exercise} 
                            workout={workout} 
                            index={index} 
                            deleteExercise={deleteExercise} 
                            setShowForm={setShowForm} 
                            />;
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
