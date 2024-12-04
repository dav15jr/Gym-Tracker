import { useEffect, useState } from "react";

export default function useSetWorkoutTitle(plan) {

const [showWorkoutTitle, setShowWorkoutTitle] = useState<boolean>(false);   

useEffect(() => {
    if(plan.length < 2) {
        setShowWorkoutTitle(false)
        }
    }, [plan])

 return {showWorkoutTitle, setShowWorkoutTitle}

}