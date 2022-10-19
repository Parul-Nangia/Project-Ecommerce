import React from 'react'
import { Card, Col, Row } from 'antd';
import { useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';




const LeaveCards = () => {
  const [priviliege, setPriviliege] = useState([]);
  const [sick, setSick] = useState([]);
  const [casual, setCasual] = useState([]);
  const [holiday, setHoliday] = useState([]);








  //============================================================== Start Casual Leave====================================================================================

  const EmployeeCasualLeave = () => {

    const token = localStorage.getItem("access_token1");
    // console.log("Employee Casual Token from Local Storage", token)
    // let token = token;
    var decoded = jwt_decode(token);
    console.log("Employee Casual Decoded token data", decoded);
    let emp_id = decoded._id
    console.log("Please help ", emp_id)


    fetch(`http://localhost:1999/leave/casual/${decoded._id}`, console.log("hello emp_id here", decoded._id))
      .then((response) => {
        // console.log("hello emp_id here", decoded._id)
        return response.json();
      }).then((data) => {

        let empCasualLeave = data
        // console.log(" helllo there data", data)     
        console.log("Casual Leave Data", empCasualLeave)

        setCasual(empCasualLeave)
      })

  }
  useEffect(() => {
    EmployeeCasualLeave();

  }, [])

  //===========
  //============================================================== End Casual Leave====================================================================================






  //============================================================== Start Sick Leave====================================================================================

  const EmployeeSickLeave = () => {


    const token = localStorage.getItem("access_token1");
    // console.log("Employee Priviliege Token from Local Storage", token)
    // let token = token;
    var decoded = jwt_decode(token);
    console.log("Employee Sick Decoded token data", decoded);
    let emp_id = decoded._id
    console.log("Please help ", emp_id)


    fetch(`http://localhost:1999/leave/sick/${decoded._id}`, console.log("hello emp_id here", decoded._id))
      .then((response) => {
        // console.log("hello emp_id here", decoded._id)
        return response.json();
      }).then((data) => {

        let empSickLeave = data
        // console.log(" helllo there data", data)     
        console.log("Sick Leave Data", empSickLeave)

        setSick(empSickLeave)
      })

  }
  useEffect(() => {
    EmployeeSickLeave();

  }, [])

  //===========
  //============================================================== End Sick Leave====================================================================================









  //============================================================== Start Priviliege Leave====================================================================================

  const EmployeePriviliegeLeave = () => {


    const token = localStorage.getItem("access_token1");
    // console.log("Employee Priviliege Token from Local Storage", token)
    // let token = token;
    var decoded = jwt_decode(token);
    console.log("Employee Priviliege Decoded token data", decoded);
    let emp_id = decoded._id
    console.log("Please help ", emp_id)


    fetch(`http://localhost:1999/leave/priviliege/${decoded._id}`, console.log("hello emp_id here", decoded._id))
      .then((response) => {
        // console.log("hello emp_id here", decoded._id)
        return response.json();
      }).then((data) => {

        let empPriviliegeLeave = data
        // console.log(" helllo there data", data)      
        console.log("Priviledge Leave Data", empPriviliegeLeave)

        setPriviliege(empPriviliegeLeave)
      })

  }
  useEffect(() => {
    EmployeePriviliegeLeave();

  }, [])

  //===========
  //============================================================== End Priviliege Leave====================================================================================






  //============================================================== Start Holiday API====================================================================================

  useEffect(() => {
    HolidayList();

  }, [])

  const HolidayList = () => {
    fetch("http://localhost:1999/holiday/pending").then((response) => {
      return response.json();
    }).then((data) => {
      console.log("hello Holidays Here", data)
      let userHolidays = data.HolidaysPending
      setHoliday(userHolidays);

      console.log("Holidays Pending", userHolidays);

    })

  }


  //===========
  //============================================================== End Holiday API====================================================================================



  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={6} className='dashboardcards'>
            <Card title="Priviliege Pending" bordered={false}>
              {11 - priviliege.length}
            </Card>
          </Col>
          <Col span={6} className='dashboardcards'>
            <Card title="Sick Pending" bordered={false}>
              {7 - sick.length}
            </Card>
          </Col>
          <Col span={6} className='dashboardcards'>
            <Card title="Casual Pending" bordered={false}>
              {7 - casual.length}
            </Card>
          </Col>
          <Col span={6} className='dashboardcards'>
            <Card title="Holidays Pending 2022" bordered={false}>
              {holiday.length}
            </Card>
          </Col>
        </Row>
      </div>
    </>

  )
}

export default LeaveCards
