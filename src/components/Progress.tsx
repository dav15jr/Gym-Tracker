import { useState, useCallback} from 'react';
import { doc, setDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ProgressData } from '../types';
import { CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, Legend, ReferenceLine } from 'recharts';
import useCheckStoredProgress from '../assets/hooks/useCheckStoredProgress';


const defaultProgress: ProgressData = {
    date: '',
    weight: 0,
};

export default function Progress({userID}) {

const [progressData, setProgressData] = useState(defaultProgress)
const [showProgressForm, setShowProgressForm] = useState(false)
const {progressHistory, setProgressHistory} = useCheckStoredProgress(userID)

useCheckStoredProgress(userID)

    function handleChange(event) {   //  Handle form input value change
        const {name, value } = event.target;
        setProgressData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
        console.log(progressHistory)
        } 
        
        const saveProgressToFirestore = useCallback(async () => {
          try {
            await setDoc(doc(db, userID, 'progressHistory'), { 
              progressHistory
            });
            alert('Progress saved');
          } catch (error) {
            console.error('Error saving progress: ', error);
          }
        }, [progressHistory, userID]);
      
        const saveProgress = (event) => {
          event.preventDefault();
          setProgressHistory((prevHistory) => [...prevHistory, progressData]);
            saveProgressToFirestore();
            return ;
        
          setShowProgressForm(false);
        };

        // const saveProgress = (event) => {
        //   event.preventDefault();
        //   setProgressHistory((prevHistory) => [...prevHistory, progressData]);
        //   setShowProgressForm(false);
        // };
      
        // useEffect(() => {
        //   if (!showProgressForm) {
        //     const saveProgressToFirestore = async () => {
        //       try {
        //         await setDoc(doc(db, userID, 'progressHistory'), { 
        //           progressHistory
        //         });
        //         alert('Progress saved');
        //       } catch (error) {
        //         console.error('Error saving progress: ', error);
        //       }
        //     };
        //     saveProgressToFirestore();
        //   }
        // }, [progressHistory, showProgressForm, userID]);


  return (
<>
    <div className="row justify-content-center mb-3">Progress Chart
      <AreaChart
        width={800}
        height={500}
        data={progressHistory}
        margin={{ right: 30 }}
      >
        <YAxis />
        <XAxis dataKey="date" />
        <CartesianGrid strokeDasharray="10 10" />
        <ReferenceLine x="May" label="Summer Holiday" stroke="red" />
        <ReferenceLine x="2024-07-25" label="Sams Wedding" stroke="red" />
        <ReferenceLine y={6000} label="Target Weight" stroke="green" />
        <Tooltip />
        <Legend />

        <Area
          type="monotone"
          dataKey="weight"
          stroke="#2563eb"
          fill="#3b82f6"
          stackId="1"
        />

        <Area
          type="monotone"
          dataKey="date"
          stroke="#7c3aed"
          fill="#8b5cf6"
          stackId="1"
        />
      </AreaChart>
      </div> 
    {!showProgressForm ? 
    (<button 
          className='btn btn-lg btn-primary m-2'
          onClick={()=> (setShowProgressForm(true))} 
          >Update Progress
      </button>) : (
  <div > Progress Form
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


