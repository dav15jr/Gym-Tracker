import { useState, useEffect, useCallback} from "react";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { ProgressHist } from '../../types';

export default function useCheckStoredProgress(userID) {
    
const [progressHistory, setProgressHistory] = useState<ProgressHist[]>([])
const [progressDates, setProgressDates] = useState<string[]>([])
const [newProgress, setNewProgress] = useState<ProgressHist[]>([])

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
    alert(`Can not fetch progress data, ${error}`)
    }
},[userID])

useEffect(() => {
    fetchProgressHistory();
    }, [userID, fetchProgressHistory])

return { progressHistory, setProgressHistory, newProgress, setNewProgress, progressDates, setProgressDates, fetchProgressHistory}
}
