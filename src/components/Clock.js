import React, { useState, useEffect } from "react";
 import { Button } from "antd";
 import axios from 'axios'



const Clock = () => {
 

  const [date, setDate] = useState(new Date());
  const [login,setLogin]=useState(null)
  
  
  
 const refreshClock = ()=> {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup () {
      clearInterval(timerId);
    };
  }, []);

  // useEffect(() => {
  //   employeetime();
  // }, []);

  // const employeetime = (emp_id) => {
  //   fetch(`http://localhost:1999/attendance/emp_id`)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       let emptime = data.attendanceRecord;
  //       setLogin(emptime);
  //       console.log("response", emptime);
       
  //     });
  // };
  // console.log(login, "hh")







  const employeecheckin  = async (emp_id) => {
   

    const Date = "new Date()"
    const CheckIn ="getTime()"
    const CheckOut = ""
    const Break =""
    const Resume = ""

    await axios.post(`http://localhost:1999/attendance/${emp_id}`, {  Date, CheckIn, CheckOut, Break, Resume  })
      .then(
        res => {



        }
      )
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
       <Button onClick={() => { }}>Break</Button>
       <Button onClick={() => { }}>Resume</Button> 
      <Button onClick={() => { }}>Checkout</Button>

       
      </div> 
      
    </>
  );
};

export default Clock;
