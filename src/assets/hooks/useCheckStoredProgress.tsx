import { useState, useEffect, useCallback} from "react";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function useCheckStoredProgress(userID) {
    
const [progressHistory, setProgressHistory] = useState([])
const [progressDates, setProgressDates] = useState([])
const [newProgress, setNewProgress] = useState([])

const fetchProgressHistory = useCallback(async () =>{
    const progArr = [];
    const progDates = [];

    try {
        const docRef = doc(db, userID, 'progressHistory');
        const docSnap = await getDoc(docRef);
        const progData = docSnap.data()

        progData.Progress.forEach((doc) => {
            progArr.push(doc);
            progDates.push(doc.convDate);
            });
        setProgressHistory(progArr)
        setProgressDates(progDates)
    } catch (error) {
    console.log('Can not fetch progress data', error)
    }
},[userID])

useEffect(() => {
    fetchProgressHistory();
    console.log('Check progress rendered')
    }, [userID, fetchProgressHistory])

return { progressHistory, setProgressHistory, newProgress, setNewProgress, progressDates, setProgressDates, fetchProgressHistory}
}
