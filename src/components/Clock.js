import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { Alert } from 'antd';

const Clock = () => {
  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState([]);
  const [show, setShow] = useState(true);
  const [disable, setDisable] = React.useState(false);
  const [EmployeeCheckIn, setEmployeeCheckIn] = useState([])
  const [EmployeeCheckOut, setEmployeeCheckOut] = useState([])
  // console.log("attendance state", attendance[0].CheckIn)



  //-------------------------------------------- Clock---------------------------------------------------------------
  const refreshClock = () => {
    setDate(new Date());
  };
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  //-------------------------------------------- Clock---------------------------------------------------------------

  //---------------------------------------------Employee Attendance GET by id API----------------------------------------------------------
  useEffect(() => {
    LoggedAttendanceAllRecord();
  }, []);

  const LoggedAttendanceAllRecord = async () => {

    await axios
      .get(
        `http://localhost:1999/attendance/record`,
      )
      .then((res) => {
        setAttendance(res?.data?.attendanceDataByID);
        console.log("Logged In Employee Attendance", attendance);

        // console.log("Checkin Type", typeof attendance[0].CheckIn);
        // console.log("attendance checkin", attendance.CheckIn);
      });
  }
  //---------------------------------------------Employee Attendance GET by id API----------------------------------------------------------

  //-------------------------------------------- Attendance Checkin---------------------------------------------------------------
  // const checkDate = new Date();
  // // console.log("Checkin Date", checkDate)
  // let day = checkDate.getDate();
  // let month = checkDate.getMonth() + 1;
  // let year = checkDate.getFullYear();
  // let currentDate = `${year}-${month}-${day}`;

  // const checkinConvert = new Date().toDateString();
  // // const againcheckinConvert = new Date().toISOString();
  // console.log("Checkin Date Conversion", checkinConvert)
  // // let day1 = checkinConvert.getDate();
  // // let month1 = checkinConvert.getMonth() + 1;
  // // let year1 = checkinConvert.getFullYear();
  // // let currentDate1 = `${year1}-${month1}-${day1}`;

  // if (currentDate === currentDate){
  //   const token = localStorage.getItem("access_token1");
  //   var decoded = jwt_decode(token);
  //   <Alert
  //     message = {decoded.name}
  //     description="You have already Checked-in"
  //     type="warning"
  //     showIcon
  //     closable
  //   /> 
  // }

  useEffect(() => {
    employeecheckin();
  }, []);

  const employeecheckin = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("access_token1");
    var decoded = jwt_decode(token);
    const CheckIn = new Date().toISOString();
    const CheckOut = "";
    const Break = "";
    const emp_id = decoded._id

    await axios
      .post(`http://localhost:1999/attendance/${emp_id}`, {
        name : decoded.name,
        emp_id : decoded._id,
        CheckIn,
        CheckOut,
        Break,
      })
      .then((res) => {
        setEmployeeCheckIn(res?.data?.attendanceData)
        setDisable(true)
        // console.log("AttendanceID For checkout", EmployeeCheckIn._id);
        console.log("Today Checkin Data", EmployeeCheckOut);
      });
  };
  //-------------------------------------------- Attendance Checkin---------------------------------------------------------------

  //-------------------------------------------- Attendance Checkout---------------------------------------------------------------
  useEffect(() => {
    employeecheckout();
  }, []);

  const employeecheckout = async () => {
    const CheckIn = attendance[0].CheckIn;
    console.log("i am here attendance checkin spread", CheckIn);
    const CheckOut = new Date();
    const Break = "";
    const ID = attendance[0]._id
    console.log("Attendance id for CheckOut", ID)

    await axios
      .put(`http://localhost:1999/attendance/${ID}`, {

        CheckIn,
        CheckOut,
        Break,
      })
      .then((res) => {
        setEmployeeCheckOut(res?.data?.updatedAttendance)
        // console.log("AttendanceID For checkout", EmployeeCheckIn._id);
        console.log("Today CheckOut Data", EmployeeCheckOut);
      });
  };
  //-------------------------------------------- Attendance Checkout---------------------------------------------------------------

  //-------------------------------------------- Attendance Break---------------------------------------------------------------

  const employeebreak = async (_id) => {
    // const token = localStorage.getItem("access_token1");
    // console.log("token from local storage:", token);
    // var decoded = jwt_decode(token);
    // console.log("Decoded token data", decoded);

    // const CheckIn ="";
    // const CheckOut = "";
    const Break = {
      start: "10.10",
      end: "10.30",
    };

    console.log("obj", Break);

    await axios.put(`http://localhost:1999/attendance/${_id}`, {
      Break,
    });
    var chkin = attendance?.CheckIn;
    console.log("checkin", chkin);

    // const CheckIn = "";
    // const CheckOut = "";
    // const Breaks = new Date();

  };
  //-------------------------------------------- Attendance Break---------------------------------------------------------------

  // const employeeresume = async () => {
  //   const token = localStorage.getItem("access_token1");
  //   console.log("token from local storage:", token);
  //   var decoded = jwt_decode(token);
  //   console.log("Decoded token data", decoded);

  //   const CheckIn = "";
  //   const CheckOut = "";
  //   const Break = "";
  //   const Resume = Date();

  //   await axios
  //     .put(`http://localhost:1999/attendance/${decoded._id}`, {
  //       CheckIn,
  //       CheckOut,
  //       Break,
  //       Resume,
  //     })
  //     .then((res) => {
  //       console.log("id", decoded._id);

  //       console.log("employee resume", res);
  //       // setDisabled(false);
  //     });
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

      {/* {attendance?.emp_id} */}


      {/* {attendance?.CheckOut}
      {attendance?.Break}

      {attendance?.Resume} */}

      {/* <div>
        <h1>Timer</h1>
        <h1>{minutes<10? "0"+minutes:minutes}:{seconds<10? "0"+seconds: seconds}</h1>
      </div> */}

      <div>
        <Button
          style={{
            color: "white",
            backgroundColor: "Green",
            fontWeight: "Bold",
          }}
          onClick={employeecheckin}

          disabled={disable}
        >
          Checkin
        </Button>
        <Button

          style={{
            color: "white",
            backgroundColor: "Tomato",
            fontWeight: "Bold",
          }}

          onClick={employeebreak}
        >
          Break
        </Button>

        <Button
          style={{
            color: "white",
            backgroundColor: "Orange",
            fontWeight: "Bold",
          }}
          onClick={employeecheckout}
        >
          Checkout
        </Button>
      </div>
      <br />
    </>
  );
};

export default Clock;
