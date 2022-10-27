import React, { useEffect, useState } from 'react'
import LeaveCards from '../components/LeaveCards';
import LeaveTable from '../components/LeaveTable';
import LeaveCalendar from '../components/LeaveCalendar';
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd';
import jwt_decode from 'jwt-decode';
import Error from '../components/Error';
import LeaveForm from '../components/LeaveForm';





const Leave = (props) => {


  const navigate = useNavigate();
  const [view, setView] = useState(false)
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

        <LeaveCards />
        <Link to="/leaveform"></Link>
        <br />
        <Button style={{ backgroundColor: "Coral", color: "white", fontWeight: "bold", display: "flex", float: "right" }} onClick={() => navigate('/leaveform')}>Apply Leave</Button>

        <h1>{view}</h1>
        <Button style={{ backgroundColor: "DarkSlateGray", color: "white", fontWeight: "bold" }} onClick={() => setView(!view)}>Calendar View</Button>
        <Button style={{ backgroundColor: "CornflowerBlue", color: "white", fontWeight: "bold" }} onClick={() => setView(!view)}>Table View</Button>

        {view ? <LeaveTable /> : <LeaveCalendar />}




      </>


    )
  }
  if (name.role === "employee") {
    return (
      <>
        <LeaveCards />

        <Link to="/leaveform"></Link>
        <br />
        <Button style={{ backgroundColor: "Coral", color: "white", fontWeight: "bold" }} onClick={() => navigate('/leaveform')}>Apply Leave</Button>


      </>
    )

  }
  else {


  }
};




export default Leave;