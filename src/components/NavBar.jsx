import EditProfile from "./EditProfile";
import LogOff from "./LogOff";

export default function NavBar({setIsLoggedIn, setWorkoutPlan, setShowForm, userID, setUserName, setShowExercises }) {


return (  
<>
<nav className="navbar navbar-expand-lg mb-5" style={{backgroundColor: "#D300FF"}}>
  <div className=" container-fluid container">
    <a className="navbar-brand px-sm-5" href="#">GYM APP</a>
    <button className="navbar-toggler mx-sm-5" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end px-md-5" id="navbarScroll">
      <ul className="navbar-nav  ">
        <li className="nav-item">
          <a className="nav-link " aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Workouts</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Progress</a>
        </li>
        <EditProfile 
            userID = {userID} 
            setUserName ={setUserName}
            setShowExercises = {setShowExercises}
        />
        <LogOff 
          setIsLoggedIn = {setIsLoggedIn}
          setWorkoutPlan = {setWorkoutPlan}
          setShowForm = {setShowForm}
        />
      </ul>
    </div>
  </div>
</nav>
</>      
)
}