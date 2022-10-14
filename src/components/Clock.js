import React, { useState, useEffect } from "react";
 import { Button } from "antd";

const Clock = () => {
 
  // let time = new Date().toLocaleDateString();
  // const[ctime,setCtime] = useState(time)

  // const UpdateTime = () => {
  //   time=new Date().toLocaleTimeString();
  //   setCtime(time);
  // }
  // setInterval(UpdateTime,1000);


  const [date, setDate] = useState(new Date());
  const [pause,setPause]=useState(false)


  const refreshClock = ()=> {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup () {
      clearInterval(timerId);
    };
  }, []);


const Checkin=()=>{
  

  
  

}

const Resume =()=>{
  

}
const Checkout =()=>{
  

}

    return (
    <>
      
      <div>
      <span>
      {date.toLocaleDateString()}
      <br/>
      {date.toLocaleTimeString()}
      </span>
      </div>

        
      

      <div>

       <Button onClick={() => {Checkin()}}>Checkin</Button>
       <Button onClick={() => {Resume()}}>Resume</Button>
       <Button onClick={() => {Checkout()}}>Checkout</Button>

       
      </div> 
      
    </>
  );
};

export default Clock;
