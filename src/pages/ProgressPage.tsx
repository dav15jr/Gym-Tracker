import { useState, useCallback} from 'react';
import { doc, setDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ProgressData } from '../types';
import NavBar from '../components/NavBar';
import { useAppContext } from '../assets/AppContext';
import WeightProgressChart from '../components/WeightProgressChart';
import BMIProgressChart from '../components/BMIProgressChart';


const defaultProgress: ProgressData = {
    date: '',
    weight: 0,
};

export default function ProgressPage() {

const { userID, userHeight, targetWeight, progressHistory, setProgressHistory, bmiHistory, setBmiHistory } = useAppContext();


const [progressData, setProgressData] = useState(defaultProgress)
const [showProgressForm, setShowProgressForm] = useState(false)
const [bmiRounded, setBmiRounded] = useState(null);


const bmiHeight = Math.pow(userHeight, 2)

    function handleChange(event) {   //  Handle form input value change
      
      const {name, value } = event.target;
      setProgressData((prevData) => {
        return {
          ...prevData,
          [name]: value,
        };
      });
      
      if (name === 'weight') {    //if the input is the weight value then calculate the bmi value.
        const bmi = (event.target.value /bmiHeight) * 10000
        const roundedBmi = Math.round(bmi * 10) / 10;
        setBmiRounded((prevData) => {
          return {
            ...prevData,
            bmi: roundedBmi,
          };
        });
      }
      console.log('your bmi height',bmiHeight)
        } 
        
        const saveProgressToFirestore = useCallback(async (updatedProgress, updatedBmiHistory) => {
          try {
            await setDoc(doc(db, userID, 'progressHistory'), { 
              Progress: updatedProgress,
              BMI: updatedBmiHistory
            });
            alert('Progress saved');
          } catch (error) {
            console.error('Error saving progress: ', error);
          }
        }, [userID]);
      
        const saveProgress = (event) => {
          event.preventDefault();
      
          setBmiHistory((prevBmiHistory) => {
            const updatedBmiHistory = [...prevBmiHistory, bmiRounded];
            setProgressHistory((prevHistory) => {
              const updatedProgress = [...prevHistory, progressData];
              // Call the Firestore save function with the updated history and BMI
              saveProgressToFirestore(updatedProgress, updatedBmiHistory);
              return updatedProgress;
            });
            return updatedBmiHistory;
          });
          setShowProgressForm(false);
        };

  return (
<>
  <NavBar />
  <WeightProgressChart
    progressHistory = {progressHistory}
    targetWeight = {targetWeight}
    />
  <BMIProgressChart
    bmiHistory = {bmiHistory}
    />
    {!showProgressForm ? 
    (<button 
          className='btn btn-lg btn-primary m-2'
          onClick={()=> (setShowProgressForm(true))} 
          >Update Progress
      </button>) : (
  <div className="container-fluid" >
      <form className="form-group" id="profile-form" onSubmit={saveProgress}>
            <h2>Track Your Progress</h2>   
    <div className="row justify-content-center g-3 mb-3 ">
        <div className ="form-floating col-6 col-sm-5" style={{maxWidth: '350px'}}>       
            <input
                className="form-control" 
                type="date"
                placeholder="Select Date"
                id="date"
                name="date"
                onChange={handleChange}  // Handle change from typed input.
                value={progressData.date}
                required/>
            <label htmlFor="date">Date:</label>
        </div> 
        <div className ="col-6 col-sm-5 " style={{maxWidth: '350px'}}>
            <div className ="input-group">
                <div className ="form-floating"> 
                    <input 
                        className="form-control" 
                        type="number"
                        placeholder="Enter Current weight"
                        id="weight"
                        name="weight"
                        onChange={handleChange}  // Handle change from typed input.
                        value={progressData.weight}
                        required/>
                    <label htmlFor="weight">Weight:</label>
                </div>
            <span className="input-group-text">Kg's</span>
          </div>
          </div>
            <button className="btn btn btn-primary col-8" style={{maxWidth: '350px', minWidth: '100px'}} type="submit">
                Save Progress
            </button>
        </div>
    </form>
  </div>
  )}
</>
  )
}


