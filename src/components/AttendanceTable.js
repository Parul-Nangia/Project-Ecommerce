import React, { useState, useEffect } from "react";
import { Table } from "antd";



const AttendanceTable = () => {
  // const [attendancedata, setAttendanceData] = useState([]);

  // useEffect(() => {
  //   employeetime();
  // }, []);

  // const employeetime = (emp_id) => {
  //   fetch(`http://localhost:1999/attendance/emp_id`)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       let emptime = data.attendanceRecord;
  //       setAttendanceData(emptime);
  //       console.log("response", emptime);
       
  //     });
  // };
  // console.log(attendancedata, "hh")



  const columns = [
    {
      title: "Employee Id",
      dataIndex: "emp_id",
    },
    {
      title: "Date",
      dataIndex: "Date",
    },
    {
      title: "CheckIn Time",
      dataIndex: "CheckIn ",
    },
    {
      title: "CheckOut Time",
      dataIndex: "CheckOut ",
    },
    {
      title: "Resume",
      dataIndex: "Resume",
    },
    {
      title: "Break",
      dataIndex: "Break",
    },
  ];

  return(
    <>

     <Table columns={columns}  />

     </>
  )
};

export default AttendanceTable;
