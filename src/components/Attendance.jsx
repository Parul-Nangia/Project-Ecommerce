import React from 'react';
import AttendanceCards from '../components/AttendanceCards';
import AttendanceTable from '../components/AttendanceTable';
import Clock from '../components/Clock';
import jwt_decode from 'jwt-decode';
import Error from '../components/Error';
import { useState, useEffect } from "react";





const Attendance = () => {

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
        <div style={{ display: "flex" }}>
          <h1>DATE :</h1>

          <div style={{ marginLeft: "5px" }}>{new Date().toLocaleDateString()}</div>

          <h1 style={{ marginLeft: "15px" }}>TIME :</h1>
          <div style={{ marginLeft: "5px" }}>{new Date().toLocaleTimeString()}</div>
        </div>


        <AttendanceCards />
        <br />
        <AttendanceTable />

      </>
    )
  }
  if (name.role === "employee") {
    return (
      <div style={{ display: "flex" }}>
        <h1>DATE :</h1>

        <div style={{ marginLeft: "5px" }}>{new Date().toLocaleDateString()}</div>

        <h1 style={{ marginLeft: "15px" }}>TIME :</h1>
        <div style={{ marginLeft: "5px" }}>{new Date().toLocaleTimeString()}</div>
      </div>

    )

  }
  else {




  }
};

export default Attendance;
