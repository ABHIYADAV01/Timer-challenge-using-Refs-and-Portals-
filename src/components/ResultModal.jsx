//this is imported for forwarding refs as refs cannot be forwarded using props
import { forwardRef,useImperativeHandle,useRef } from "react";

//the function must follow this syntax while importing a forwarded ref 
const ResultModal= forwardRef(function ResultModal({onReset,targetTime,remainingTime},ref){
    
    const dialog = useRef();

    useImperativeHandle(ref,()=>{
        return {
            //this can be given any name u want but here we name it open()
            open(){
                //showModal() is a built in function for the dialog HTML tag, here when the timer expires we should show the box
                 dialog.current.showModal();
            }
        }
    })

    const userLost = remainingTime<=0;
    //tofixed(x) is a JS function that fixes decimals to 'x' decimal places
    const formattedRemainingTime = (remainingTime/1000).toFixed(2);

    const score = Math.round((1- remainingTime/(targetTime*1000))*100);

    return(
        <dialog ref={dialog} className="result-modal" >
        {userLost && <h2> You Lost</h2>}
        {!userLost && <h2> Your Score:{score}</h2>}
        <p>
           The target time was <strong>{targetTime} seconds.</strong>
        </p>

        <p>
            You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong>
        </p>
        
        {/* using method as dialog in a form tag and then declaring a button inside the form allow us to close
         the dialog box without writing ans extra JS code */}
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
         
        </dialog>
    )

});

export default ResultModal;