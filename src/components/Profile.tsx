
import useCheckStoredProfile from '../assets/hooks/useCheckStoredProfile';
import { doc, setDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";


export default function Profile ({userID, userName, setUserName}) {


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

    // const loadProfile = () => {
    //     fetchProfileFromFirestore
    //     }

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
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
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
        <li>Age: {profileData.age}</li>
        <li>Sex: {profileData.sex}</li>
        <li>Weight: {profileData.weight}</li>
        </ul>
    </div>
    )}
    </>
)

}