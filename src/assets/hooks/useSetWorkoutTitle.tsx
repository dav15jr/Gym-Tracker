import { useEffect, useState } from "react";

export default function useSetWorkoutTitle(plan) {

const [showWorkoutTitle, setShowWorkoutTitle] = useState(false);   

useEffect(() => {
    if(plan.length < 2) {
        setShowWorkoutTitle(false)
        }
        // setWorkoutChanged(true)
    }, [plan])

 return {showWorkoutTitle, setShowWorkoutTitle}

}