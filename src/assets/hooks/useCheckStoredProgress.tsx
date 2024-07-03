import { useState, useEffect, useCallback} from "react";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function useCheckStoredProgress(userID) {
    
const [progressHistory, setProgressHistory] = useState([])

const fetchProgressHistory = useCallback(async () =>{
    const tempArr = [];
    try {
        const docRef = doc(db, userID, 'progressHistory');
        const docSnap = await getDoc(docRef);
        const progData = docSnap.data()

        progData.progressHistory.forEach((doc) => {
            tempArr.push(doc);
            });
            console.log('This is your progress',tempArr)

        setProgressHistory(tempArr)
        
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

return { progressHistory, setProgressHistory}
}


