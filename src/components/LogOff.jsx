import { getAuth, signOut } from "firebase/auth";
import { useAppContext } from '../assets/AppContext';
import { Link} from 'react-router-dom'

export default function LogOff (){

    const { setIsLoggedIn, setWorkoutPlan, setShowForm } = useAppContext();

    const logoutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            setIsLoggedIn(false)
            setWorkoutPlan([]) // reset workout plan
            setShowForm(true) //reset show form
          }).catch((error) => {
            // An error happened.
            console.log("Log out error",error)
          });
        }

return (
<>
    <Link 
        className="nav-link" 
        data-bs-target="#logOffModal"
        data-bs-toggle="modal">
        Log Out
    </Link>
    <div className="modal fade" id="logOffModal" tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5 w-100 text-center" id="modalLabel">Log Off Warning</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            Are you sure you would like to Log Out ? </div>
        <div className="modal-footer justify-content-center">
            <button type="button" className="btn btn-info" data-bs-dismiss="modal">No</button>
            <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={logoutUser} >Yes, Log Out</button>
        </div>
        </div>
    </div>
    </div>
</>
)}
