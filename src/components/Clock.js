import React, { useState, useEffect } from "react";
 import { Button } from "antd";
 import axios from 'axios'


const Clock = () => {
 
  // let time = new Date().toLocaleDateString();
  // const[ctime,setCtime] = useState(time)

  // const UpdateTime = () => {
  //   time=new Date().toLocaleTimeString();
  //   setCtime(time);
  // }
  // setInterval(UpdateTime,1000);


  const [date, setDate] = useState(new Date());
  const [login,setLogin]=useState(null)
  
  
  




  
  // const [emp_id,setEmp_id]=useState("")
  // const[ndate,setNdate]=useState("")
  // const [checkin,setCheckin]=useState("")
  // const [checkout,setCheckout]=useState("")
  // const[resume,setResume]=useState("")
  // const [break,setBreak]=useState("")



  const refreshClock = ()=> {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup () {
      clearInterval(timerId);
    };
  }, []);
  const employeecheckin  = async (_id) => {
    console.log(_id)



    const emp_id = setLogin.emp_id
    console.log(emp_id, "jgj")
    console.log(setLogin, "login")
    
    const Date =setLogin.Date
    const CheckIn =setLogin.CheckIn
    const CheckOut = setLogin.CheckOut
    const Break = setLogin.Break
    const Resume = setLogin.Resume
    await axios.post(`http://localhost:1999/attendance/${_id}`, { emp_id, Date, CheckIn, CheckOut, Break, Resume  })
      .then(
        res => {



        }
      )
      }


// const Resume =()=>{
  

// }
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

       <Button onClick={() => {employeecheckin()}}>Checkin</Button>
       {/* <Button onClick={() => {Resume()}}>Resume</Button> */}
       <Button onClick={() => {Checkout()}}>Checkout</Button>

       
      </div> 
      
    </>
  );
};

export default Clock;
