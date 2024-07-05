import { useState, useEffect, useCallback} from "react";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function useCheckStoredProgress(userID) {
    
const [progressHistory, setProgressHistory] = useState([])
const [bmiHistory, setBmiHistory] = useState([])

const fetchProgressHistory = useCallback(async () =>{
    const progArr = [];
    const bmiArr = [];
    try {
        const docRef = doc(db, userID, 'progressHistory');
        const docSnap = await getDoc(docRef);
        const progData = docSnap.data()

        progData.Progress.forEach((doc) => {
            progArr.push(doc);
            });
            console.log('This is your progress',progArr)
        setProgressHistory(progArr)

        progData.BMI.forEach((doc) => {
            bmiArr.push(doc);
            });
            console.log('This is your progress',bmiArr)
        setBmiHistory(bmiArr)
        
        console.log('Check progress func rendered')
    } catch (error) {
    console.log('Can not fetch progress data')
    }
},[userID])

// console.log('This is your progress', progressHistory)

useEffect(() => {
    fetchProgressHistory();
    console.log('Check progress rendered')
    }, [userID, fetchProgressHistory])

return { progressHistory, setProgressHistory, bmiHistory, setBmiHistory}
}
