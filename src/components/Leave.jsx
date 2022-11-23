import React, { useEffect, useState } from 'react'
import LeaveTable from '../components/LeaveTable';
import LeaveCalendar from '../components/LeaveCalendar';
import EmployeeLeaveTable from '../components/EmployeeLeaveTable';
import EmployeeLeaveCalendar from '../components/EmployeeLeaveCalendar';
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd';
import jwt_decode from 'jwt-decode';






const Leave = (props) => {


  const navigate = useNavigate();
  const [view, setView] = useState(false)
  const [calendarview, setCalendarview] = useState(false)
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

        <Link to="/leaveform"></Link>
        <br />

        <h1>{view}</h1>
        <Button style={{ backgroundColor: "DarkSlateGray", color: "white", fontWeight: "bold" }} onClick={() => setView(!view)}>Calendar View</Button>
        <Button style={{ backgroundColor: "CornflowerBlue", color: "white", fontWeight: "bold" }} onClick={() => setView(!view)}>Table View</Button>
        <br />
        <br />

        {view ? <LeaveTable /> : <LeaveCalendar />}

      </>


    )
  }
  if (name.role === "employee") {
    return (
      <>

        <Link to="/leaveform"></Link>
        <br />
        <Button style={{ backgroundColor: "Coral", color: "white", fontWeight: "bold" }} onClick={() => navigate('/leaveform')}>Apply Leave</Button>

        <br />
        <h1>{calendarview}</h1>
        <Button style={{ backgroundColor: "lightgray", color: "gray", fontWeight: "bold" }} onClick={() => setCalendarview(!calendarview)}>Calendar View</Button>
        <Button style={{ backgroundColor: "lightgray", color: "gray", fontWeight: "bold" }} onClick={() => setCalendarview(!calendarview)}>Table View</Button>
        <br />
        <br />

        {calendarview ? <EmployeeLeaveTable /> : <EmployeeLeaveCalendar />}

      </>
    )

  }
  else {


  }
};




export default Leave;