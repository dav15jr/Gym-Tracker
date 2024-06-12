
import useCheckStoredProfile from '../assets/hooks/useCheckStoredProfile';
import { doc, setDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth, signOut } from "firebase/auth";

export default function Profile ({userID, userName, setUserName, setIsLoggedIn}) {

    const {profileExists, setProfileExists, profileData, setProfileData} = useCheckStoredProfile(userID, setUserName );
    
    
    useCheckStoredProfile(userID, setUserName)   // Check if profile exists

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
        <form className="profile-form" id="profile-form" onSubmit={saveProfile}>
            <h2>Create Your Profile</h2>           
        <label htmlFor="name">Name:</label>
            <input
                type="text"
                placeholder="Enter name"
                id="name"
                name="name"
                onChange={handleChange}  // Handle change from typed input.
                value={profileData.name}
                required/>
        <label htmlFor="age">Age:</label>
            <input
                type="text"
                placeholder="Enter age"
                id="age"
                name="age"
                onChange={handleChange}  // Handle change from typed input.
                value={profileData.age}
                required/>
        <label htmlFor="sex">Sex:</label>
            <select id="sex" name="sex" value={profileData.sex} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
        <label htmlFor="height">Height (Cm's):</label>
            <input
                type="text"
                placeholder="Enter height"
                id="height"
                name="height"
                onChange={handleChange}  // Handle change from typed input.
                value={profileData.height}
                required/>
        <label htmlFor="weight">Weight (Kg's):</label>
            <input
                type="text"
                placeholder="Enter weight"
                id="weight"
                name="weight"
                onChange={handleChange}  // Handle change from typed input.
                value={profileData.weight}
                required/>
        <button className="formSubmitBtn" type="submit">
            Save Profile
        </button>
        </form>
    ) : 
    ( <div>
        <h2>Welcome {userName} </h2>
        <ul>
            <li>Name: {profileData.name}</li>
            <li>Sex: {profileData.sex}</li>
            <li>Age: {profileData.age}</li>
            <li>Height: {profileData.height} Cm's</li>
            <li>Weight: {profileData.weight} Kg's</li>
        </ul>
        <button onClick={() => setProfileExists(false)}>Edit Profile</button>
    </div>
    )}
<button onClick={logoutUser}>Log Out</button>
    </>
)

}