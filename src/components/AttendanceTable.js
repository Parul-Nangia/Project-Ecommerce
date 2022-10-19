import React, { useState, useEffect } from "react";
import { Table } from "antd";
import jwt_decode from 'jwt-decode';
import Error from '../components/Error';



const AttendanceTable = () => {

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

    <AttendanceTable />
  )
  }
  if(name.role==="employee"){
    return(
      <Error />
    )
  
  }
  else{
   
    
  }
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
