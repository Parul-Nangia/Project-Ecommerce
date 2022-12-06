import React from 'react'
import { useState, useEffect } from "react";
import { Calendar, Badge } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";



const AttendanceCalendar = () => {
  const [dataSource, setDataSource] = useState([]);


  useEffect(() => {
    getLoggedAttendanceData();
  }, []);
  const getLoggedAttendanceData = async () => {
    const token = localStorage.getItem("access_token1");
    var decoded = jwt_decode(token);
  
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/attendance/singlemploy/${decoded._id}`)
      .then((res) => {
        setDataSource(res?.data?.SingleEmployeeAllAttendance);
        console.log("SingleEmployeeAllAttendance", res?.data?.SingleEmployeeAllAttendance);
      });
  };


  const dateCellRender = (value) => {
    // console.log("value", value)
    const stringValue = value.format("YYYY-MM-DD");
    var newArray = dataSource?.filter(function (el) {

      return el.TodayDate === stringValue

      //  el.EmployeeName &&
      //  el._id;

    }
    )
    console.warn("dataSource", dataSource)

    return (
      <>

        {/* <ul className="events"> */}
        {newArray.map((item) => (
          <li key={item._id}>
            <Badge status="success" text={item.name}/>
          </li>
        ))}
        {/* </ul> */}

      </>
    )

  };
  return (

    <div>
      <br/>
      <Calendar dateCellRender={dateCellRender} />
    </div>
  )
}

export default AttendanceCalendar;
