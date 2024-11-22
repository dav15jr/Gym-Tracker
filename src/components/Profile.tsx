import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import useCheckStoredProfile from '../assets/hooks/useCheckStoredProfile';
import { useAppContext } from '../assets/AppContext';

export default function Profile() {
    const {
        userID,
        setUserHeight,
        setTargetWeight,
        userName,
        setUserName,
        setShowExercises,
        newUser,
    } = useAppContext();
    const { profileExists, setProfileExists, profileData, setProfileData } =
        useCheckStoredProfile(userID, setUserName, setShowExercises);

    useCheckStoredProfile(userID, setUserName, setShowExercises); // Check if profile exists

    function handleChange(event) {
        //  Handle form input value change
        const { name, value } = event.target;
        setProfileData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    }

    const saveProfile = (event) => {
        event.preventDefault();
        setUserName(profileData.name);
        saveProfileToFirestore(); //save data to firestore
        setProfileExists(true);
        setShowExercises(true);
        setUserHeight(profileData.height);
        setTargetWeight(profileData.weightGoal);
    };

    async function saveProfileToFirestore() {
        await setDoc(doc(db, userID, 'profileData'), {
            // Add a new 'Workout' document in 'userID' collection
            profileData,
        });
        alert('Profile saved successfully');
    }

    return (
        <>
            {!profileExists ? (
                <form
                    className="form-group"
                    id="profile-form"
                    onSubmit={saveProfile}
                >
                    <h2>Create Your Profile</h2>
                    <div className="row justify-content-center g-3 m-2">
                        <div className="form-floating col-6 col-sm-5 col-md-auto">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter name"
                                id="name"
                                name="name"
                                onChange={handleChange} // Handle change from typed input.
                                value={profileData.name}
                                autoComplete="username"
                                required
                            />
                            <label htmlFor="name">Name:</label>
                        </div>

                        <div className="form-floating col-6 col-sm-5 col-md-auto">
                            <select
                                className="form-control "
                                id="sex"
                                name="sex"
                                value={profileData.sex}
                                onChange={handleChange}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <label htmlFor="sex">Sex:</label>
                        </div>
                        <div className="form-floating col-6 col-sm-5 col-md-1">
                            <input
                                className="form-control"
                                type="number"
                                placeholder="Enter age"
                                id="age"
                                name="age"
                                onChange={handleChange} // Handle change from typed input.
                                value={profileData.age}
                                required
                            />
                            <label htmlFor="age">Age:</label>
                        </div>

                        <div className="col-6 col-sm-5 col-md-auto">
                            <div className="input-group">
                                <div className="form-floating">
                                    <input
                                        className="form-control"
                                        type="number"
                                        placeholder="Enter height"
                                        id="height"
                                        name="height"
                                        onChange={handleChange} // Handle change from typed input.
                                        value={profileData.height}
                                        required
                                    />
                                    <label htmlFor="height">Height:</label>
                                </div>
                                <span className="input-group-text bg-dark px-2 px-md-3">
                                    Cm's
                                </span>
                            </div>
                        </div>
                        <div className="col-6 col-sm-5 col-md-auto">
                            <div className="input-group">
                                <div className="form-floating">
                                    <input
                                        className="form-control"
                                        type="number"
                                        placeholder="Enter current weight"
                                        id="weightNow"
                                        name="weightNow"
                                        onChange={handleChange} // Handle change from typed input.
                                        value={profileData.weightNow}
                                        required
                                    />
                                    <label htmlFor="weightNow">
                                        Current Weight:
                                    </label>
                                </div>
                                <span className="input-group-text bg-dark px-2 px-sm-3">
                                    Kg's
                                </span>
                            </div>
                        </div>
                        <div className="col-6 col-sm-5 col-md-auto">
                            <div className="input-group">
                                <div className="form-floating">
                                    <input
                                        className="form-control"
                                        type="number"
                                        placeholder="Enter Target weight"
                                        id="weightGoal"
                                        name="weightGoal"
                                        onChange={handleChange} // Handle change from typed input.
                                        value={profileData.weightGoal}
                                        required
                                    />
                                    <label htmlFor="weightGoal">
                                        Target Weight:
                                    </label>
                                </div>
                                <span className="input-group-text bg-dark px-2 px-sm-3">
                                    Kg's
                                </span>
                            </div>
                        </div>
                        <div className="row justify-content-center m-3">
                            <button
                                className="btn btn-primary"
                                style={{ maxWidth: '250px' }}
                                type="submit"
                                aria-label="Save Profile"
                            >
                                Save Profile
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <div>
                    <h2>
                        Welcome {newUser ? ' ' : 'back '}
                        {userName}{' '}
                    </h2>
                </div>
            )}
        </>
    );
}
