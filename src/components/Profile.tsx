import {useState} from 'react';
import { ProfileData } from '../types';
import useCheckStoredProfiles from '../assets/hooks/useCheckStoredProfiles';


const defaultProfile:ProfileData = {
    name: 'John',
    age: 18,
    sex:'male',
    weight:80,
};

export default function Profile () {

const [profileData, setProfileData] = useState(defaultProfile);
const [storedProfiles, setStoredProfiles] = useState([]);
const [selectedProfile, setSelectedProfile] = useState();
const [loadedProfile, setLoadedProfile] = useState();
const [profileChosen, setProfileChosen] = useState(false)

const {profileExists, savedProfiles} = useCheckStoredProfiles(selectedProfile);

function handleChange(event) {   //  Handle form input value change
    const {name, value } = event.target;
    setProfileData((prevData) => {
        return {
            ...prevData,
            [name]: value,
        };
    });
} 

function handleSubmit(event) {
    event.preventDefault();

    const json = JSON.stringify(profileData);   //Convert the object to a string and store it in the local storage
    const profileName = `${profileData.name}`;
    localStorage.setItem(profileName, json);

    setStoredProfiles(prevArray => [...prevArray, profileName])
    const jsonProfiles= JSON.stringify(storedProfiles); 
    localStorage.setItem( 'Profiles', jsonProfiles);

    console.log(profileData);
    console.log(storedProfiles);
}
const handleSelect =(e) => {
    setSelectedProfile(e.target.value)
}
const loadProfile = () => {
    setLoadedProfile(JSON.parse(localStorage.getItem(`${selectedProfile}`)));
    setProfileChosen(true);
}
const delProfile = () => {
    localStorage.removeItem(`${selectedProfile}`);
    savedProfiles();
}
return (
<>
    {profileExists && 
        <div>
            <p>Load Profile.</p>
            <select onChange={handleSelect} defaultValue='default'>
                <option value='default'>Select Profile</option> {
                    storedProfiles.map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                ))
                }
            </select>
            <button id='loadWorkoutBtn' onClick={loadProfile}>Load Profile</button>
            <button id='delWorkoutBtn' onClick={delProfile}>Delete Profile</button>
        </div>}
    {profileChosen && 
        <form className="profile-form" id="profile-form" onSubmit={handleSubmit}>
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
        <button id="formSubmitBtn" type="submit">
            Save Profile
        </button>
        </form>
    }
<div>
    <h2>Welcome {selectedProfile} </h2>
    <p>{loadedProfile}</p>
</div>
</>
)

}