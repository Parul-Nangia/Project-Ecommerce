import React, {useEffect, useState } from 'react'
import LeaveCards from '../components/LeaveCards';
import LeaveTable from '../components/LeaveTable';
import LeaveCalendar from '../components/LeaveCalendar';
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd';
import jwt_decode from 'jwt-decode';
import Error from '../components/Error';





const Leave = (props) => {


  const navigate = useNavigate();
  const[view,setView]=useState(false)
  const[name,setName]=useState("");
  
  // useEffect(() => {
  //   userData();

  // }, [])

  

  
  // const userData = ()=> {
  //   const token = localStorage.getItem("access_token1");
  //   console.log("token from local storage:", token)
  //   // let token = token;
  //   var decoded = jwt_decode(token);
  //   console.log("Decoded token data",decoded);
  //   setName(decoded)
  // }

  // if (name.role === "admin"){
  //   console.log("my role is " ,name.role)
  //   return (

  //   <LeaveCards />
  // )
  // }
  // if(name.role==="employee"){
  //   return(
  //     <LeaveCards />
  //   )
  
  // }
  // else{
   
    
  // }




  return (

    <>
    
                
           <Link to="/leaveform"></Link>
              <br/>
              <Button  onClick={()=> navigate('/leaveform')}>Apply Leave</Button>
              
            <h1>{view}</h1>
           <Button onClick={()=> setView(!view)}>Calendarview</Button>
           <Button onClick={()=> setView(!view)}>Tableview</Button>
          
           {view ? <LeaveTable/> :<LeaveCalendar/>  }

                
                

    </>
  );
};
      



export default Leave;