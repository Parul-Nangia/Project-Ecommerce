import React from 'react'
import { useState, useEffect } from "react";
import { Calendar, Badge } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import moment from 'moment';


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

  // function onFullRender(date) {
  //   for (let d = 0; d < dataSource?.length; d++) {
  //     console.warn("dataSource", dataSource[d].TodayDate)
  //     var MyDate = new Date(dataSource[d].TodayDate);
  //     console.log("MyDate", MyDate)

  //     var MyDateString;
  //     MyDate.setDate(MyDate.getDate());
  //     MyDateString =
  //       MyDate.getFullYear() +
  //       "-" +
  //       ("0" + (MyDate.getMonth() + 1)).slice(-2) +
  //       "-" +
  //       ("0" + MyDate.getDate()).slice(-2);
  //       console.log("MyDateString", MyDateString)
  //     const day = date;
  //     console.log("day", day)

  //   }

    // let style;
    // if(day === 1) {
    //  style = { border: "1px solid #d9d9d9"};
    // }
    // else {
    //  style = { border: "1px solid red"};
    // }
    // return <div style={style}>{day}</div>;
  // }


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
            <Badge className="calendarcell" />
          </li>
        ))}
        {/* </ul> */}

      </>
    )

  };
  return (

    <div>
      <br />
      <Calendar dateCellRender={dateCellRender}  />
    </div>
  )
}
// dateFullCellRender={onFullRender}
export default AttendanceCalendar;
