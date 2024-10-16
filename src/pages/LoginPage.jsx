import {useState, useEffect} from 'react';
import { useAppContext } from '../assets/AppContext';
import { useNavigate } from 'react-router-dom';
import useCheckAuthState from '../assets/hooks/useCheckAuthState';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


export default function LoginPage () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {setUserID, setNewUser, setIsLoggedIn, isLoggedIn} = useAppContext()
    const auth = getAuth();
  
    //----------------------- USER REGISTRATION & LOGIN --------------------------------// 
    
    useCheckAuthState()
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isLoggedIn) {
        navigate('/home', { replace: true });
      }
    }, [isLoggedIn, navigate]);

const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
.then(() => {
      // Password reset email sent!
      // ..
      alert('Password reset e-mail sent - check your mailbox')
           
    })
.catch((error) => {
    if (error.code === 'auth/missing-email') {
    alert('Please Enter your Email.')
    } else if (error.code === 'auth/invalid-email') {
    alert('Please Enter a valid Email.')
    } else if (error.code === 'auth/user-not-found') {
    alert('Sorry Account not found, check your email is correct and try again.')
    } else{
    console.log('Error: ', error.message)
    alert(error.message)
    }
    });
}
    const handleError = (error) => {
        if (error.code === 'auth/wrong-password') {
            alert('Wrong Password, please try again.')
        } else if (error.code === 'auth/user-not-found') {
            alert('Wrong Email or you are not Registered.')
        } else if (error.code === 'auth/missing-password') {
            alert('Please Enter your Password.')
        } else if (error.code === 'auth/invalid-email') {
            alert('Please Enter your Email.')
        } else if (error.code === 'auth/weak-password') {
            alert('Password should be at least 6 characters.')
        } else if (error.code === 'auth/email-already-in-use') {
            alert('Account already registered. Please Log In')
        } else if (error.code === 'auth/too-many-requests') {
            alert('Too many attempts, please reset your password - check your email')
            sendPasswordResetEmail(auth, email) //Send password reset email
        }
        console.log("Error message:",error.message)
        // alert(error.message)
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the form from submitting
            document.getElementById('LoginBtn').click(); // Trigger the login button click
            console.log('Enter key pressed')
        }
      };

    async function  handleRegister (e) {
        e.preventDefault();
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                setIsLoggedIn(true)
                setUserID(auth.currentUser.uid) // Set the user ID using the provided uniques id from 
                setNewUser(true)
                // alert('Welcome! You have successfully registered')
            } catch(error) {
                handleError(error)
            }
    }
    async function handleLogin (e) {
        e.preventDefault();
            try {
                await signInWithEmailAndPassword(auth, email, password)
                setIsLoggedIn(true)
                // alert('Sign in successful')
                setUserID(auth.currentUser.uid) // Set the user ID using the provided uniques id from 
                setEmail('')
                setPassword('')
                setNewUser(false)
            } catch(error) {
                handleError(error)
            }

    }               
return (
<>
    <div className="container" id="hero"> 
      <div className="row flex-lg-row align-items-center py-4" id="hero-info">
        <div className="col-12 col-lg-5 mx-auto">
          <h1 className='loginHeader text-primary suez-one-regular'>PrimeYou</h1>
          <h3 className='loginBody suez-one-regular'>Effortless workout tracker that helps you focus on exercising to become your Prime Self.</h3>
        </div>
        <div className="col-11 col-lg-6 mx-auto">
          <img className="img-fluid rounded" src="img/black arms down (6).jpg"/>
        </div>
      </div>
    </div>
    <form className="form-group px-4" id="login-form" onSubmit={handleLogin} onKeyDown={handleKeyDown}>
        <p className="h3">Please Login</p>   
    <div className="row justify-content-center py-4 g-2">
    <div className="col-11 col-sm-5 col-md-4 col-xl-3" style={{maxWidth: '300px'}} >
        <div className ="form-floating">
            <input
                className="form-control" 
                id="Email"
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={e => setEmail(e.target.value)} 
                value={email}
                autoComplete="email"
                required
                />
            <label htmlFor="Email">Email:</label>
        </div>
    </div>
    <div className ="col-11 col-sm-5 col-md-4 col-xl-3" style={{maxWidth: '300px'}} >
        <div className ="form-floating">
            <input
                className="form-control" 
                id="Password"
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={e => setPassword(e.target.value)}  
                value={password}
                autoComplete="current-password"
                required
                />
            <label htmlFor="Password">Password:</label>
        </div>
    </div>
    </div>     
    <div className="btn-group col-10 col-sm-7 col-md-5 py-3" style={{maxWidth: '400px'}} role="group"  >
        <button className="btn btn-primary" id="LoginBtn" type="submit" value='Login' name='Login' onClick={handleLogin}> Log In </button>
        <button className="btn btn-outline-primary px-1" id="RegisterBtn" type="submit" value='Register' name='Register' onClick={handleRegister}> Register </button>
    </div>
    </form>


    <a
        className="link" 
        data-bs-target="#logOffModal"
        data-bs-toggle="modal">
        Forgot Password ?
    </a>
    <div className="modal fade" id="logOffModal" tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-4 w-100 text-center" id="modalLabel">Forgotten Your Password?</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            
            Would you like us to send you a Password Reset Email? </div>
        <div className="modal-footer justify-content-center">
            <button type="button" className="btn btn-info mx-3" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={resetPassword} >Yes, Send Email</button>
        </div>
        </div>
    </div>
    </div>
</>
)
}