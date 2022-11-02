import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";

const Clock = () => {
  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState([]);
  const [show, setShow] = useState(true);
  const [disable, setDisable] = React.useState(false);
  const [EmployeeCheckIn, setEmployeeCheckIn] = useState([])
  const [EmployeeCheckOut, setEmployeeCheckOut] = useState([])







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
    const token = localStorage.getItem("access_token1");
    console.log("token from local storage:", token);
    var decoded = jwt_decode(token);
    console.log("Decoded token data", decoded);
    await axios
      .get(
        `http://localhost:1999/attendance/employee/${decoded._id}`,
        console.log("hello EmpID here", decoded._id)
      )
      .then((res) => {
        setAttendance(res?.data?.attendanceDataByEmpID);
        console.log("Logged In Employee Attendance", attendance);



        // console.log("Checkin Type", typeof attendance[0].CheckIn);
        // console.log("attendance checkin", attendance.CheckIn);
      });
  }
  //---------------------------------------------Employee Attendance GET by id API----------------------------------------------------------

  //-------------------------------------------- Attendance Checkin---------------------------------------------------------------
  useEffect(() => {
    employeecheckin();
  }, []);

  const employeecheckin = async () => {
    const token = localStorage.getItem("access_token1");
    console.log("token from local storage:", token);
    var decoded = jwt_decode(token);
    console.log("Decoded token data", decoded);

    const CheckIn = new Date().toISOString();
    console.log("I am here Clock Date", CheckIn);
    const name = decoded.name;
    const CheckOut = "";
    const Break = "";
    const emp_id = decoded._id

    await axios
      .post(`http://localhost:1999/attendance/${emp_id}`, {
        emp_id: emp_id,
        name,
        CheckIn,
        CheckOut,
        Break,
      })
      .then((res) => {
        // console.log("CheckIn Response", res);
        setEmployeeCheckIn(res?.data?.attendanceRecord)
        console.log("Today Checkin Data", EmployeeCheckIn)
        console.log("Checkin id", EmployeeCheckIn._id)
        setDisable(true);
      });
    // }
  };
  //-------------------------------------------- Attendance Checkin---------------------------------------------------------------

  //-------------------------------------------- Attendance Checkout---------------------------------------------------------------
  useEffect(() => {
    employeecheckout();
  }, []);

  const employeecheckout = async () => {
    const CheckIn = EmployeeCheckIn.CheckIn;
    console.log("i am here attendance checkin spread", CheckIn);
    const CheckOut = new Date();
    const Break = "";
    const ID = EmployeeCheckIn._id



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

  const employeebreak = async () => {
    const token = localStorage.getItem("access_token1");
    console.log("token from local storage:", token);
    var decoded = jwt_decode(token);
    console.log("Decoded token data", decoded);

    // const CheckIn ="";
    // const CheckOut = "";
    const Break = {
      start: "10.10",
      end: "10.30",
    };

    console.log("obj", Break);

    await axios.put(`http://localhost:1999/attendance/${decoded._id}`, {
      Break,
    });
    var chkin = attendance?.CheckIn;
    console.log("checkin", chkin);

    const CheckIn = "";
    const CheckOut = "";
    const Breaks = new Date();

    await axios
      .put(`http://localhost:1999/attendance/${decoded._id}`, {
        CheckIn,
        CheckOut,
        Break,
      })

      .then((res) => {
        console.log("employee break", res);
      });

    // setShow(!show);
    // // show?
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

      {attendance?.name}

      {attendance?.CheckIn}
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
          onClick={() => {
            employeebreak();
          }}
        >
          Break
        </Button>

        <Button
          style={{
            color: "white",
            backgroundColor: "Orange",
            fontWeight: "Bold",
          }}
          onClick={() => {
            employeecheckout();
          }}
        >
          Checkout
        </Button>
      </div>
    </>
  );
};

export default Clock;
