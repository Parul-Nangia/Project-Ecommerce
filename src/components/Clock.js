import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Clock = () => {
  const [date, setDate] = useState(new Date());

  const [attendance, setAttendance] = useState([]);

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
        // console.log("attendance checkin", attendance[0].CheckIn);
        console.log("attendance empid", attendance[0].emp_id);
        // console.log("date", Date())
        // console.log("okkkkkkk",attendance[0].decoded._id)
      });

    if (attendance[0].emp_id == decoded._id) {


      alert("You have already checked in");
    } 
    
    else {
      const CheckIn = new Date();
      console.log("I am here Clock Date", CheckIn);
      const CheckOut = "";
      const Break = "";
      const Resume = "";
      const emp_id = decoded._id;



      await axios
        .post(`http://localhost:1999/attendance/${decoded._id}`, {
          emp_id,
          CheckIn,
          CheckOut,
          Break,
          Resume,
        })
        .then((res) => {
          console.log("attendance response", res);
        });
    }
  };
  // const employeebreak = async (emp_id) => {
  //   const Break = "";

  //   await axios.put("", { Break }).then((res) => {});
  // };

  return (
    <>
      <div>
        <span>
          {date.toLocaleDateString()}
          <br />
          {date.toLocaleTimeString()}
        </span>
      </div>

      {attendance?.emp_id}
      {attendance?.CheckIn}
      {attendance?.CheckOut}
      {attendance?.Break}
      {attendance?.Resume}

      <div>
        <Button
          onClick={() => {
            employeecheckin();
          }}
        >
          Checkin
        </Button>
        <Button onClick={() => {}}>Break</Button>
        <Button onClick={() => {}}>Resume</Button>
        <Button onClick={() => {}}>Checkout</Button>
      </div>
    </>
  );
};

export default Clock;
