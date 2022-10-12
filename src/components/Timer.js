import React,{useState,useEffect} from 'react'
import { Button } from 'antd';
import { MilitaryTechTwoTone } from '@mui/icons-material';

const Timer = () => {

    const [time,setTime]=useState(0);
    const [timerOn,setTimeOn]=useState(false);
    // const [seconds,setSeconds]=useState(0);
    // const [minutes,setMinutes]=useState(0);

//     var timer;
//   useRef(()=>{
//     timer= setInterval(()=>{
//     setSeconds(seconds+1);

//     if(seconds===59){
//         setMinutes(minutes+1);
//         setSeconds(0);
//      }
//      },1000)
//      return () => clearInterval(timer);

// });
//    const restart=()=>{

//     setSeconds(0);
//     setMinutes(0)

//    }
//    const stop=()=>{

//     clearInterval(timer);
// }
    useEffect(()=>{
        let interval = null;


        if (timerOn) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10)
            },10)
        }
        else{
            clearInterval(interval)
        }
       return () => clearInterval(interval)

    },[timerOn])
             
         return (
    <div>
     {/* <h1>Timer</h1> */}
       <div>
         <span>{("0"+ Math.floor((time / 60000) % 60)).slice(-2)} : </span>
         <span>{("0"+ Math.floor((time / 1000) % 60)).slice(-2)} : </span>
         <span>{("0"+ ((time / 10) % 100)).slice(-2)}  </span>
       </div>

    <div>
      <Button onClick={()=>setTimeOn(true)}>Check In</Button>
      <Button onClick={()=>setTimeOn(false)}>Check Out</Button>
      <Button onClick={()=>setTimeOn(false)}>Resume</Button>
      <Button onClick={()=>setTime(0)}>Reset</Button>


      </div>
    </div>
  )
}

export default Timer;




{/* <h1>{minutes<10?"0"+minutes:minutes}:{seconds<10?"0"+seconds:seconds}</h1>
      <Button onClick={restart}>Check In</Button>
      <Button onClick={stop}>Check Out</Button>
       */}