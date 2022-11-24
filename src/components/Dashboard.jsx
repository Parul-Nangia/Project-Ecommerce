import React from 'react';
import DashboardCards from '../components/DashboardCards';
import { useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import Error from '../components/Error';






const Dashboard = () => {

  const [name, setName] = useState("");

  useEffect(() => {
    userData();

  }, [])




  const userData = () => {
    const token = localStorage.getItem("access_token1");
    console.log("token from local storage:", token)
    // let token = token;
    var decoded = jwt_decode(token);
    console.log("Decoded token data", decoded);
    setName(decoded)
  }

  if (name.role === "admin") {
    console.log("my role is ", name.role)
    return (
      <>

      <DashboardCards />
     
      </>
    )
  }
  if (name.role === "employee") {
    return (
      <Error />
    )

  }
  else {


  }






  return (
    <>

      <DashboardCards />
      
     
    </>

  )
}

export default Dashboard