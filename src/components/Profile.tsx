import { doc, setDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";
import useCheckStoredProfile from '../assets/hooks/useCheckStoredProfile';
import { useAppContext } from '../assets/AppContext';

export default function Profile ({userName, setUserName, setShowExercises, newUser}) {

    const { userID, setUserHeight, setTargetWeight} = useAppContext();
    const {profileExists, setProfileExists, profileData, setProfileData} = useCheckStoredProfile(userID, setUserName, setShowExercises );
    
    useCheckStoredProfile(userID, setUserName, setShowExercises)   // Check if profile exists

    // console.log('User ID on Profile page', userID);
    console.log('Profile is', profileExists)
    function handleChange(event) {   //  Handle form input value change
        const {name, value } = event.target;
        setProfileData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
        console.log('profile error change')
        } 
        
    const saveProfile = (event) => {
            event.preventDefault();
            setUserName(profileData.name);
            
            console.log(profileData);
            saveProfileToFirestore();   //save data to firestore
            setProfileExists(true)
            setShowExercises(true)
            setUserHeight(profileData.height)
            setTargetWeight(profileData.weightGoal)
            }
                
    async function saveProfileToFirestore  (){
            await setDoc(doc(db, userID, 'profileData'), {    // Add a new 'Workout' document in 'userID' collection
            profileData
            });
            alert("Profile saved successfully");
            }

    console.log('profile page rendered')

return (
<>
    {!profileExists ? (  
    <form className="form-group" id="profile-form" onSubmit={saveProfile}>
            <h2>Create Your Profile</h2>   
    <div className="row justify-content-center g-3 mb-3">
        <div className ="form-floating col-8 col-sm-auto col-md-auto">       
            <input
                className="form-control" 
                type="text"
                placeholder="Enter name"
                id="name"
                name="name"
                onChange={handleChange}  // Handle change from typed input.
                value={profileData.name}
                required/>
            <label htmlFor="name">Name:</label>
        </div> 

        <div className ="form-floating col-5 col-sm-3 col-md-2"> 
            <select 
                className="form-control " 
                id="sex" 
                name="sex" 
                value={profileData.sex} 
                onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <label htmlFor="sex">Sex:</label>
        </div>
        <div className ="form-floating col-4 col-sm-auto col-md-2"> 
            <input
                className="form-control" 
                type="number"
                placeholder="Enter age"
                id="age"
                name="age"
                onChange={handleChange}  // Handle change from typed input.
                value={profileData.age}
                required/>
            <label htmlFor="age">Age:</label>
        </div>

        <div className ="col-5 col-sm-auto col-md-2">
            <div className ="input-group">
                <div className ="form-floating"> 
                <input
                    className="form-control" 
                    type="number"
                    placeholder="Enter height"
                    id="height"
                    name="height"
                    onChange={handleChange}  // Handle change from typed input.
                    value={profileData.height}
                    required/>
                <label htmlFor="height">Height:</label>
                </div>
                <span className="input-group-text">Cm's</span>
            </div>
        </div>
        <div className ="col-5 col-sm-auto col-md-2">
            <div className ="input-group">
                <div className ="form-floating"> 
                    <input 
                        className="form-control" 
                        type="number"
                        placeholder="Enter current weight"
                        id="weightNow"
                        name="weightNow"
                        onChange={handleChange}  // Handle change from typed input.
                        value={profileData.weightNow}
                        required/>
                    <label htmlFor="weightNow">Current Weight:</label>
                </div>
            <span className="input-group-text">Kg's</span>
            </div>
        </div>
        <div className ="col-5 col-sm-auto col-md-2">
            <div className ="input-group">
                <div className ="form-floating"> 
                    <input 
                        className="form-control" 
                        type="number"
                        placeholder="Enter Target weight"
                        id="weightGoal"
                        name="weightGoal"
                        onChange={handleChange}  // Handle change from typed input.
                        value={profileData.weightGoal}
                        required/>
                    <label htmlFor="weightGoal">Target Weight:</label>
                </div>
            <span className="input-group-text">Kg's</span>
            </div>
        </div>
            <button className="btn btn-lg btn-primary w-50" type="submit">
                Save Profile
            </button>
        </div>
    </form>
    
    ) : ( 
    <div>
        <h2>Welcome {newUser ? ' ' :'back '}{userName} </h2>
    </div>
    )}
</>
)}