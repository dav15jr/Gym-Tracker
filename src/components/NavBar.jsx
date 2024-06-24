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

  <nav className="navbar navbar-expand-sm mb-5" style={{backgroundColor: "#e3f2fd"}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">GYM APP</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarScroll">
      <ul className="navbar-nav my-2 my-lg-0 navbar-nav-scroll" >
      {/* style="--bs-scroll-height: 100px;" */}
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
      role="button" 
        userID = {userID} 
        setUserName ={setUserName}
        setShowExercises = {setShowExercises}
    />
          <button className="nav-link" role="button" onClick={logoutUser} >Log Out</button>
      </ul>
    </div>
  </div>
</nav>

</>      
)
}