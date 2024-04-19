import { useState, useEffect } from "react";


export default function useTimer(rest, count, exerciseDone ) {

    const [restTime, setRestTime] = useState(rest);
    const [timerDone, setTimerDone] = useState(false);

useEffect(() => {   //used for timer function, so that it runs during specific conditions only.
    if (count ===0) return;  //check whether set count has begun.
    if (exerciseDone) return; //check if the  excercise is finished.
    else {

    const intervalId = setInterval(() => {
            if (restTime === 0) {
                setTimerDone(true);
                clearInterval(intervalId);
                return
            } else;
            setRestTime(time => time - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    }
  }, [restTime, count, exerciseDone]);


  return {restTime, setRestTime, timerDone, setTimerDone} 
}