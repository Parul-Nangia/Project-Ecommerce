import React from 'react';
import AttendanceCards from '../components/AttendanceCards';
import AttendanceTable from '../components/AttendanceTable';
import jwt_decode from 'jwt-decode';
import Error from '../components/Error';
import { useState, useEffect } from "react";




const Attendance = () => {

  const[name,setName]=useState("");
  
  useEffect(() => {
    userData();

  }, [])

  

  
  const userData = ()=> {
    const token = localStorage.getItem("access_token1");
    console.log("token from local storage:", token)
    // let token = token;
    var decoded = jwt_decode(token);
    console.log("Decoded token data",decoded);
    setName(decoded)
  }

  if (name.role === "admin"){
    console.log("my role is " ,name.role)
    return (
      <>

      <AttendanceCards />

      <AttendanceTable />

      </>
  )
  }
  if(name.role==="employee"){
    return(
      <Error />
    )
  
  }
  else{

    
   
    
  }

 
  return (
    <>


            
            <AttendanceCards />
            <br/>
            <AttendanceTable />
             
             





    </>
  );
};

export default Attendance;
