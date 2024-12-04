import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useEffect, useState} from 'react';
import { AuthStateType } from "../../types";
export default function useCheckAuthState(): AuthStateType {

    const [userID, setUserID] = useState<string |null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

const auth = getAuth();

useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          setUserID(user.uid)
          setIsLoggedIn(true)
        } else {
          // User is signed out
          setIsLoggedIn(false)
        }
      });
    })

    return {userID, isLoggedIn, setUserID, setIsLoggedIn}
}