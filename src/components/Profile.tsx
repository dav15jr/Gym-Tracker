
import { getAuth, signOut } from "firebase/auth";
import { doc, setDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";
import useCheckStoredProfile from '../assets/hooks/useCheckStoredProfile';


export default function Profile ({userID, userName, setUserName, setIsLoggedIn, setWorkoutPlan, setShowForm, setShowExercises}) {

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
            }
                
    async function saveProfileToFirestore  (){
            await setDoc(doc(db, userID, 'profileData'), {    // Add a new 'Workout' document in 'userID' collection
            profileData
            });
            alert("Profile saved successfully");
            }

    const logoutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('Successfully logged out')
            setIsLoggedIn(false)
            setWorkoutPlan([]) // reset workout plan
            setShowForm(true) //reset show form
          }).catch((error) => {
            // An error happened.
            console.log('User already logged out')
            console.log(error)
          });

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
                        placeholder="Enter weight"
                        id="weight"
                        name="weight"
                        onChange={handleChange}  // Handle change from typed input.
                        value={profileData.weight}
                        required/>
                    <label htmlFor="weight">Weight:</label>
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
<div id='profile'>
<h2>Welcome {userName} </h2>
<div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Profile</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <ul>
            <li><span>Name:</span> {profileData.name}</li>
            <li><span>Sex:</span> {profileData.sex}</li>
            <li><span>Age:</span> {profileData.age}</li>
            <li><span>Height:</span> {profileData.height} Cm's</li>
            <li><span>Weight:</span> {profileData.weight} Kg's</li>
        </ul>
      </div>
      <div className="modal-footer justify-content-center">
        <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Edit Profile</button>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex={-1}>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">Edit Your Profile</h1>
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
        <div className ="form-floating col-sm-3"> 
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
        <div className ="col-sm-4">
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
        <div className ="col-sm-4">
            <div className ="input-group">
                <div className ="form-floating"> 
                    <input 
                        className="form-control" 
                        type="number"
                        placeholder="Enter weight"
                        id="weight"
                        name="weight"
                        onChange={handleChange}  // Handle change from typed input.
                        value={profileData.weight}
                        required/>
                    <label htmlFor="weight">Weight:</label>
                </div>
            <span className="input-group-text">Kg's</span>
            </div>
        </div>

        </div>
        <button className="btn btn-success justify-self-center" type="submit" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Save Profile</button>
        </form>
      </div>
    </div>
  </div>
</div>
<button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Profile</button>
    </div>
    )}
<button onClick={logoutUser}  id='logoutBTN'>Log Out</button>
    </>
)

}