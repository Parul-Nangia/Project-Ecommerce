import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { Alert } from "antd";

const Clock = () => {
  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState([]);

  const [disableCheckin, setDisableCheckin] = React.useState(false);
  const [disableCheckout, setDisableCheckout] = React.useState(false);
  const [EmployeeCheckIn, setEmployeeCheckIn] = useState([]);
  const [EmployeeCheckOut, setEmployeeCheckOut] = useState([]);

  // console.log("attendance state", attendance[0].CheckIn)
  const [objects, setObjects] = useState({});
  const [show, setShow] = useState(true)




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
    LoggedAttendanceAllRecord(attendance);
    console.log("Logged In Employee Attendance", attendance);

  }, []);

  const LoggedAttendanceAllRecord = async () => {
    const token = localStorage.getItem("access_token1");
    var decoded = jwt_decode(token);

    await axios
      .get(`http://localhost:1999/attendance/record/${decoded._id}`)
      .then((res) => {
        setAttendance(res?.data?.attendanceDataByID);

        // console.log("Checkin Type", typeof attendance[0].CheckIn);
        // console.log("attendance checkin", attendance.CheckIn);
      });
  };
  //---------------------------------------------Employee Attendance GET by id API----------------------------------------------------------


  //-------------------------------------------- Attendance Checkin---------------------------------------------------------------
  const employeecheckin = async () => {
    // e.preventDefault();
    const token = localStorage.getItem("access_token1");
    var decoded = jwt_decode(token);
    // today date
    // date format "2022-10-02" with zero
    var MyDate = new Date();
    var MyDateString;
    MyDate.setDate(MyDate.getDate());

    MyDateString = MyDate.getFullYear() +
      "-" + ("0" + (MyDate.getMonth() + 1)).slice(-2) +
      "-" + ("0" + MyDate.getDate()).slice(-2);
    // today date

    const CheckIn = new Date().toLocaleTimeString();
    const TodayDate = MyDateString;
    const CheckOut = "";
    const Breaks = "";
    const emp_id = decoded._id;

    await axios
      .post(`http://localhost:1999/attendance/${emp_id}`, {
        name: decoded.name,
        emp_id: decoded._id,
        TodayDate,
        CheckIn,
        CheckOut,
        Breaks,
      })
      .then((res) => {
        setEmployeeCheckIn(res?.data?.newAttendance);
        setDisableCheckin(true);
        console.log("Today CheckIn data", attendance);

        // console.log("AttendanceID For checkout", EmployeeCheckIn._id);
      });


    if (attendance[0].CheckIn > "09:10:00 AM") {
      let data = {
        emp_id: decoded._id,
        EmployeeName: decoded.name,
        SupervisorName: "Sudhir Dadwal",
        Department: "Software",
        LeaveType: "ShortLeave",
        LeaveDate: MyDateString,
        ReturnDate: "Null",
        TotalHoursRequested: "Half Day",
        TotalDaysRequested: 0,
      };

      fetch("http://localhost:1999/leave", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        console.log("You Are Late By 9:10AM. Short Leave Applied", data);
      });
    }
  };



  //-------------------------------------------- Attendance Checkin---------------------------------------------------------------


  //-------------------------------------------- Attendance Break---------------------------------------------------------------

  // const employeebreak = async () => {
  //   const token = localStorage.getItem("access_token1");
  //   console.log("token from local storage:", token);
  //   var decoded = jwt_decode(token);
  //   console.log("Decoded token data", decoded);

  //   // const CheckIn ="";
  //   // const CheckOut = "";
  //   const Breaks = {
  //     start: "",
  //     end: ""
  //   };
  //-------------------------------------------- Attendance Break---------------------------------------------------------------



  //-------------------------------------------- Attendance Checkout---------------------------------------------------------------
  // useEffect(() => {
  //   //employeecheckout();
  // }, []);

  const employeecheckout = async () => {
    
    const CheckIn = attendance[0]?.CheckIn;
    console.log("i am here attendance checkin spread", CheckIn);
    const CheckOut = new Date();
    const Breaks = "";
    const ID = attendance[0]?._id;
    console.log("Attendance id for CheckOut", ID);

    await axios
      .put(`http://localhost:1999/attendance/${ID}`, {
        CheckIn,
        CheckOut,
        Breaks,
      })
      .then((res) => {
        setEmployeeCheckOut(res?.data?.updatedAttendance);
        setDisableCheckout(true);
      });
    console.log("Today CheckOut Data", EmployeeCheckOut);
  };
  //-------------------------------------------- Attendance Checkout---------------------------------------------------------------




  // const Break = new FormData()
  // Break.append("Object",object)

  // Break.append("end",end)

  // console.log("Object", object);



  const employeebreak = async () => {

    // const break = new Date().toLocaleTimeString()
    // const end = ""
    // const Breaks = 
    const ID = attendance[0]._id;
    const CheckIn = attendance[0].CheckIn;
    const CheckOut = "";


    await axios
      .put(`http://localhost:1999/attendance/${ID}`, {
        CheckIn,
        // Breaks,
        CheckOut,
      })

      .then((res) => {
        setObjects(res?.data?.updatedAttendance);
        console.log("Breaks Response", res);
        // console.log("Breaks", Breaks);

      });
  };

  const employeeresume = async () => {

    const end = new Date().toLocaleTimeString()
    const Breaks = [...end]
    const ID = attendance[0]._id;
    const CheckIn = attendance[0].CheckIn;

    const CheckOut = "";
    await axios
      .put(`http://localhost:1999/attendance/${ID}`, {
        CheckIn,
        Breaks,
        CheckOut,

      })


      .then((res) => {
        console.log("employee resume", res);
      });
  };




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
      {/* {breaks.map(=>())} */}
      {/* {objects.map(object=>())} */}

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
          onClick={() => {
            employeecheckin();
          }}
          disabled={disableCheckin}
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
          onClick={employeeresume}
        >
          Resume
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
          disabled={disableCheckout}
        >
          Checkout
        </Button>
      </div>
      <br />
    </>
  );
};

export default Clock;
