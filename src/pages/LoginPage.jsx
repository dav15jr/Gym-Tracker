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


    async function handleLogin (e) {
        e.preventDefault();
    
        if (document.activeElement.name === 'Register') {  // Check which button name was used to submit the form.
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                setIsLoggedIn(true)
                setUserID(auth.currentUser.uid) // Set the user ID using the provided uniques id from 
                setNewUser(true)
                // alert('Welcome! You have successfully registered')
            } catch(error) {
                alert('Account already registered. Please Log In')
            }
        } else if (document.activeElement.name === 'Login') {
            try {
                await signInWithEmailAndPassword(auth, email, password)
                setIsLoggedIn(true)
                // alert('Sign in successful')
                setUserID(auth.currentUser.uid) // Set the user ID using the provided uniques id from 
                setEmail('')
                setPassword('')
                setNewUser(false)
            } catch(error) {
                if (error.code === 'auth/wrong-password') {
                    alert('Wrong Password, please try again.')
                } else if (error.code === 'auth/user-not-found') {
                    alert('Wrong Email or you are not Registered.')
                } else if (error.code === 'auth/too-many-requests') {
                    alert('Too many attempts, please reset your password - check your email')
                    sendPasswordResetEmail(auth, email) //Send password reset email
                }
                console.log("Error message:",error.message)
                // alert(error.message)
            }
        }
    }               
return (
<>
    <div className="container" id="hero"> 
      <div className="row flex-lg-row align-items-center py-4" id="hero-info">
        <div className="col-lg-6">
          <h1 className='h1'>Gym Tracker</h1>
          <h3>Unleash your inner beast to be your best self.</h3>
        </div>
        <div className="col-10 col-lg-6 mx-auto">
          <img className="img-fluid rounded" src="img/gym man front.jpg"/>
        </div>
      </div>
    </div>
    <form className="form-group px-4" id="login-form" onSubmit={handleLogin}>
        <p className="h2">Please Login</p>   
    <div className="row justify-content-center py-4 g-2">
    <div className="col-10 col-sm-5 col-md-4 col-xl-3" style={{maxWidth: '300px'}} >
        <div className ="form-floating">
            <input
                className="form-control" 
                id="Email"
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={e => setEmail(e.target.value)} 
                value={email}
                required/>
            <label htmlFor="Email">Email:</label>
        </div>
    </div>
    <div className ="col-10 col-sm-5 col-md-4 col-xl-3" style={{maxWidth: '300px'}} >
        <div className ="form-floating">
            <input
                className="form-control" 
                id="Password"
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={e => setPassword(e.target.value)}  
                value={password}
                required/>
            <label htmlFor="Password">Password:</label>
        </div>
    </div>
    </div>     
    <div className="btn-group col-10 col-sm-7 col-md-5 pb-4" style={{maxWidth: '400px'}} role="group"  >
        <button className="btn btn-primary" id="LoginBtn" type="submit" value='Login' name='Login' required> Log In </button>
        <button className="btn btn-secondary px-1" id="RegisterBtn" type="submit" value='Register' name='Register' required> Register </button>
    </div>
    </form>
</>
)
}