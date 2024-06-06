import { useState, useEffect } from "react";

export default function useCheckStoredProfiles(storage) {
    

    const [storedProfiles, setStoredProfiles] = useState([]);
    const [profileExists, setProfileExists] = useState(false);

useEffect(() => {
    const profiles = Object.entries(localStorage) 
        if (profiles.length > 1){  //check if a profile exists - not including the 'debug' hence using > 1 not > 0
            setProfileExists(true)
        }
        savedProfiles();
},[storage])  

const savedProfiles = () => {
    const storedNames = Object.keys(localStorage);
    setStoredProfiles(storedNames.filter((name) => name !== 'debug')) // filter out the 'debug' entry in local storage    
    }

return {profileExists, storedProfiles, savedProfiles}
}

