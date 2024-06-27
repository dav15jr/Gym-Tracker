import { getAuth, signOut } from "firebase/auth";

export default function LogOff ({setIsLoggedIn, setWorkoutPlan, setShowForm}){

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
    {/* Button trigger modal  */}
    <button className="btn nav-link"  data-bs-toggle="modal" data-bs-target="#logOffModal">
    Log Out
    </button>

    {/* // -- Modal -- */}
    <div className="modal fade" id="logOffModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content bg-danger-subtle">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="modalLabel">Log Off Warning</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            Are you sure you would like to Log Out ? </div>
        <div className="modal-footer justify-content-center">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
            <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={logoutUser} >Yes, Log Out</button>
        </div>
        </div>
    </div>
    </div>
</>
)}
