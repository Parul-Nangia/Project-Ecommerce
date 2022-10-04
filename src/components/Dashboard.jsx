import React from 'react';
import Navbar from './Navbar';
import Chart from './Chart';
import Sidebar from './Sidebar';
import './Dashboard.css';
// import Widget from './Widget'
// import './widget.css'
import Featured from "./Featured"
import './chart.css'
import { Card } from 'antd';
import { useState, useEffect } from "react";



let a1 = {
   
   
    margin: "20px", 
    textAlign: "center", 
    padding:"10px", 
    fontWeight: "bold",
    fontSize: "large",
    marginLeft:"80px",
    marginTop:"100px",
    marginBottom:"100px",
    width:"250px",
    height:"150px",
    boxShadow: "2px 4px 10px 1px rgba(201, 201,201, 0.47)"
  
  }
  let a2 = {

    textAlign: "center", 
    padding:"10px", 
    fontWeight: "bold",
    fontSize: "large"
  }
 


const Dashboard = () => {

  const [employs, setEmploys] = useState([]);
  const [todayLeave, setTodayLeave] = useState([]);
  const [weekLeave, setweekLeave] = useState([]);
  const [monthLeave, setMonthLeave] = useState([]);





//============================================================== Start Total Employees====================================================================================
  const employeeList = () => {
    fetch("http://localhost:1999/employee")

      .then((response) => {
        return response.json();
      }).then((data) => {

        let emp = data.employeeData


        setEmploys(emp)
      })

  }
  useEffect(() => {
    employeeList();

  }, [])
//============================================================== End Total Employees====================================================================================








//============================================================== Start Weekly On Leave Employees====================================================================================

  const thisWeekEmployeeLeaveData = () => {
    fetch("http://localhost:1999/leave/WeekData")

      .then((response) => {
        return response.json();
      }).then((empWeekdata) => {

        let empWeekLeave = empWeekdata.data
        console.log("Weekly On Leave",empWeekLeave)

        setweekLeave(empWeekLeave)
      })

  }
  useEffect(() => {
    thisWeekEmployeeLeaveData();

  }, [])
//============================================================== End Weekly On Leave Employees====================================================================================








//============================================================== Start Today On Leave Employee====================================================================================
const todayEmployeeLeaveData = () => {
  fetch("http://localhost:1999/leave/TodayData")

    .then((response) => {
      return response.json();
    }).then((empTodaydata) => {

      let empTodayLeave = empTodaydata.data
      console.log("Today On Leave",empTodayLeave)

      setTodayLeave(empTodayLeave)
    })

}
useEffect(() => {
  todayEmployeeLeaveData();

}, [])
//===========
//============================================================== End Today On Leave Employees====================================================================================









//============================================================== Start Monthly On Leave Employees====================================================================================

  const monthlyEmployeeLeaveData = () => {
    fetch("http://localhost:1999/leave/MonthData")

      .then((response) => {
        return response.json();
      }).then((monthData) => {

        let empMonthLeave = monthData.data
        console.log("Monthly On Leave",empMonthLeave)
       

        setMonthLeave(empMonthLeave)
      })

  }
  useEffect(() => {
    monthlyEmployeeLeaveData();

  }, [])
//============================================================== End Monthly On Leave Employees====================================================================================









  return (
    <>
      <Navbar />
      <Sidebar>
        <div className="dashboard">

          <div className="dashboardContainer">

            <div style={{ display: 'flex' }}>


              <Card style={a1}>
                <h1 style={a2}>Employees</h1>
                <h2 style={a2}>{employs.length}</h2>
              </Card>


              <Card style={a1}>
                <h1 style={a2}>Today On Leave</h1>
                <h2 style={a2}>{todayLeave.length}</h2>
                
              </Card>
              <Card style={a1}>
                <h1 style={a2}>Weekly On Leave</h1>
                <h2 style={a2}>{weekLeave.length}</h2>
              </Card>
              <Card style={a1}>
                <h1 style={a2}>Monthly On Leave</h1>
                <h2 style={a2}>{monthLeave.length}</h2>
              </Card>

            </div>
            <div className="charts">
              <Featured />
              <Chart />
            </div>
          </div>
        </div>
      </Sidebar>
    </>

  )
}

export default Dashboard