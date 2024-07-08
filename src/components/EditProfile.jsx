import useCheckStoredProfile from '../assets/hooks/useCheckStoredProfile';
import { doc, setDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function EditProfile({userID, setUserName, setShowExercises, setUserHeight, setTargetWeight }) {

const {setProfileExists, profileData, setProfileData} = useCheckStoredProfile(userID, setUserName, setShowExercises);

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
return(
<>    
<button 
    className="btn nav-link" 
    data-bs-target="#profileModalToggle" 
    data-bs-toggle="modal">
    Profile
</button>

<div className="modal fade" id="profileModalToggle" aria-hidden="true" aria-labelledby="profileModalToggleLabel" tabIndex={-1}>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="profileModalToggleLabel">Profile</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body" id='profile'>
        <ul>
            <li><span>Name:</span> {profileData.name}</li>
            <li><span>Sex:</span> {profileData.sex}</li>
            <li><span>Age:</span> {profileData.age}</li>
            <li><span>Height:</span> {profileData.height} Cm's</li>
            <li><span>Current Weight:</span> {profileData.weightNow} Kg's</li>
            <li><span>🎯 Target Weight:</span> {profileData.weightGoal} Kg's</li>
        </ul>
      </div>
      <div className="modal-footer justify-content-center">
        <button className="btn btn-primary" data-bs-target="#profileModalToggle2" data-bs-toggle="modal">Edit Profile</button>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="profileModalToggle2" aria-hidden="true" aria-labelledby="profileModalToggleLabel2" tabIndex={-1}>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="profileModalToggleLabel2">Edit Your Profile</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="form-floating align-content-center m-4" id="profile-form" onSubmit={saveProfile}>
        <div className="row justify-content-center g-3 mb-3">
            <div className ="form-floating col-sm-6">       
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
        <div className ="form-floating col-sm-5"> 
            <select 
                className="form-control" 
                id="sex" 
                name="sex" 
                value={profileData.sex} 
                onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <label htmlFor="sex">Sex:</label>
        </div>
        <div className ="form-floating col-sm-4"> 
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
        <div className ="col-sm-5">
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
        <div className ="col-sm-5">
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
        <div className ="col-sm-5">
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
        </div>
        <button className="btn btn-success justify-self-center" type="submit" data-bs-target="#profileModalToggle" data-bs-toggle="modal">Save Profile</button>
        </form>
      </div>
    </div>
  </div>
</div>
</>
)

}