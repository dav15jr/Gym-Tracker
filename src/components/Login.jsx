import {useState, useEffect} from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";


export default function Login ({setIsLoggedIn, setUserID}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = getAuth();
    console.log('login page rendered')
    //----------------------- USER REGISTRATION & LOGIN --------------------------------// 

useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          console.log(user.uid)
          setUserID(user.uid)
          setIsLoggedIn(true)
          // ...
        } else {
          // User is signed out
          // ...
          console.log('User is not signed')
        }
      });
    })



    async function handleLogin (e) {
        e.preventDefault();
    

        if (document.activeElement.name === 'Register') {  // Check which button name was used to submit the form.
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                setIsLoggedIn(true)
                alert('Welcome! You have successfully registered')
            } catch(error) {
                console.log(error)
                alert('Account already registered. Please Login')
            }
        } else if (document.activeElement.name === 'Login') {
            try {
                await signInWithEmailAndPassword(auth, email, password)
                setIsLoggedIn(true)
                alert('Sign in successful')
                setEmail('')
                setPassword('')
            } catch(error) {
                alert('Account not found, please Register.')
                console.log(error)
            }
        }
        setUserID(auth.currentUser.uid) // Set the user ID using the provided uniques id from firebase.
        console.log(auth.currentUser.uid)
        setPassword('')
    }               
return (
<>
    <form className="login-form" id="login-form" onSubmit={handleLogin}>
        <h2>Please Login</h2>           
    <label htmlFor="email">Email:</label>
        <input
            type="email"
            placeholder="Enter email"
            id="email"
            name="email"
            onChange={e => setEmail(e.target.value)} 
            value={email}
            required/>
    <label htmlFor="password">Password:</label>
        <input
            type="password"
            placeholder="Enter password"
            id="password"
            name="password"
            onChange={e => setPassword(e.target.value)}  
            value={password}
            required/>
    <button className="formSubmitBtn" type="submit" value='Register' name='Register' required> Register </button>
    <button className="formSubmitBtn" type="submit" value='Login' name='Login' required> Login </button>
    </form>
</>
)

}