import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Clock = () => {
  const [date, setDate] = useState(new Date());
  // const[seconds,setSeconds] = useState(0)
  // const[minutes,setMinutes] = useState(0)

  const [attendance, setAttendance] = useState([]);
  const[show,setShow]=useState(false)
 

  // var timer;
  // useEffect(() => {

  //   timer= setInterval(()=>{

  //     setSeconds(seconds+1);

  //     if(seconds===59){
  //       setMinutes(minutes+1);
  //       setSeconds(0);
  //     }

  //   },1000)

  // return () => clearInterval(timer);
  // });

  const refreshClock = () => {
    setDate(new Date());
  };
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    employeecheckin();
  }, []);

  const employeecheckin = async () => {
    const token = localStorage.getItem("access_token1");
    console.log("token from local storage:", token);
    var decoded = jwt_decode(token);
    console.log("Decoded token data", decoded);

    await axios
      .get(
        `http://localhost:1999/attendance/${decoded._id}`,
        console.log("hello EmpID here", decoded._id)
      )
      .then((res) => {
        setAttendance(res?.data?.attendanceData);
        console.log("Logged In Employee Attendance", attendance);

        console.log("attendance checkin", attendance.CheckIn);
      });