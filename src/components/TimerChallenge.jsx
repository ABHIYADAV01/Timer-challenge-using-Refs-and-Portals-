import { useState,useRef} from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {

    const timer = useRef();
    const dialog = useRef();

    //we will use the setInterval function of JavaScript
    //note that setInterval take milliseconds as input , but our targetTime is in seconds so multiply by 1000
    const [timeRemaining,setTimeRemaining] = useState(targetTime*1000);

    const timerIsActive = timeRemaining>0 && timeRemaining<targetTime*1000;

    //this part of the code is for the time we don't stop the timer and it expires automatically
    if(timeRemaining<=0){
      clearInterval(timer.current);
      dialog.current.open();
    }

    function handleReset(){
      setTimeRemaining(targetTime*1000);
    }
 
    function handleStart(){
       timer.current = setInterval(() =>{
          setTimeRemaining(prevTimeRemaining=> prevTimeRemaining-10);
        },10);
    }
   
    //this part of code is for the time we stop the timer manually
    function handleStop(){
       dialog.current.open();
        clearInterval(timer.current);
    }


  return (
    <>
    <ResultModal ref={dialog} targetTime={targetTime}  remainingTime={timeRemaining} onReset={handleReset}/>
    <section className="challenge">
      <h2>{title}</h2>
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>

      <p>
        <button onClick={timerIsActive ? handleStop:handleStart}>
            {timerIsActive? 'Stop':'Start'} Challenge
        </button>
      </p>

      <p className={timerIsActive ? 'active':undefined}>
        {timerIsActive ? 'Time is running....' :'Timer inactive'}
      </p>
    </section>
    </>
  );
}
