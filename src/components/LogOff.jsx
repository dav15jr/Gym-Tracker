import { useAppContext } from '../assets/AppContext';
import { getAuth, signOut } from 'firebase/auth';
export default function LogOff() {
    const { setIsLoggedIn, setWorkoutPlan, setShowForm } = useAppContext();

    const logoutUser = async () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                setIsLoggedIn(false);
                setWorkoutPlan([]); // reset workout plan
                setShowForm(true); //reset show form
            })
            .catch((error) => {
                // An error happened.
                console.log('Log out error', error);
            });
    };

    return (
        <>
            <button
                type="button"
                className="nav-link btn btn-link"
                data-bs-toggle="modal"
                data-bs-target="#logOffModal"
                style={{ textDecoration: 'none' }}
            >
                Log Out
            </button>
            <div
                className="modal fade"
                id="logOffModal"
                tabIndex={-1}
                aria-labelledby="modalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-4 w-100 text-center"
                                id="modalLabel"
                            >
                                Log Off Warning!
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to Log Out ?{' '}
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button
                                type="button"
                                className="btn btn-info"
                                data-bs-dismiss="modal"
                                aria-label="Cancel"
                            >
                                No
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-bs-dismiss="modal"
                                onClick={logoutUser}
                                aria-label="Yes, Log Out"
                            >
                                Yes, Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
