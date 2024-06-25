import { getAuth, signOut } from "firebase/auth";
import EditProfile from "./EditProfile";

export default function NavBar({setIsLoggedIn, setWorkoutPlan, setShowForm, userID, setUserName, setShowExercises }) {

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

return (  
<>
  <nav className="navbar navbar-expand-md mb-5 px-1 px-md-5" style={{backgroundColor: "#D300FF"}}>
  <div className="container-fluid">
    <a className="navbar-brand px-sm-5" href="#">GYM APP</a>
    <button className="navbar-toggler mx-sm-5" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end px-md-5" id="navbarScroll">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link " aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Workouts</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">Progress</a>
        </li>
        <EditProfile 
            userID = {userID} 
            setUserName ={setUserName}
            setShowExercises = {setShowExercises}
        />
        <button className="btn nav-link" onClick={logoutUser} >Log Out</button>
      </ul>
    </div>
  </div>
</nav>

</>      
)
}