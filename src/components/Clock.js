import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { Alert } from "antd";
import moment from 'moment';

const Clock = () => {
  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState([]);
  const [TodayAttendance, setTodayAttendance] = useState([]);
  const [disableCheckin, setDisableCheckin] = React.useState(false);
  const [disableCheckout, setDisableCheckout] = React.useState(false);
  const [EmployeeCheckIn, setEmployeeCheckIn] = useState([]);
  const [attendanceAll, setAttendanceAll] = useState([]);

  const [EmployeeCheckOut, setEmployeeCheckOut] = useState([]);

  // console.log("attendance state", attendance[0].CheckIn)
  const [objects, setObjects] = useState({});
  const [show, setShow] = useState();
  // console.log("show?", !show)

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
    const LoggedAttendanceAllRecord = async () => {
      const token = localStorage.getItem("access_token1");
      var decoded = jwt_decode(token);

      await axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/attendance/employee/${decoded._id}`
        )
        .then((res) => {
          setAttendance(res?.data?.attendanceDataByEmpID[0]);
          const Breaks = attendance?.Breaks
          // console.log("Breaks", Breaks)
          if (res?.data?.attendanceDataByEmpID[0].CheckIn !== "") {
            setDisableCheckin(true);
          }
          if (res?.data?.attendanceDataByEmpID[0].CheckOut !== "") {
            setDisableCheckout(true);
          }

          if (attendance?.Breaks.length > 0) {
            console.log("breaks???", attendance?.Breaks.length);
            console.log(
              "Break/end",
              attendance?.Breaks[attendance?.Breaks.length - 1]?.end
            );
          } else {
            console.log("breaks", attendance?.Breaks);
          }
          if (attendance?.Breaks === []) {
            setShow(true);
            console.log("if Break []", show);
          } else if (
            attendance?.Breaks[attendance?.Breaks.length - 1]?.end !== ""
          ) {
            setShow(true);
            console.log("if end ! null", show);
          } else if (
            attendance?.Breaks[attendance?.Breaks.length - 1]?.start !== "" &&
            attendance?.Breaks[attendance?.Breaks.length - 1]?.end === ""
          ) {
            setShow(false);
            console.log("if start ! null and end null", show);
          }
        });
    };
    LoggedAttendanceAllRecord();
    console.log("Today Attendance Data", attendance);
  }, []);
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

    MyDateString =
      MyDate.getFullYear() +
      "-" +
      ("0" + (MyDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + MyDate.getDate()).slice(-2);
    // today date

    const CheckIn = new Date().toLocaleTimeString();
    const TodayDate = MyDateString;
    const CheckOut = "";
    const Breaks = [];
    const emp_id = decoded._id;
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/attendance/${emp_id}`, {
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
        window.location.reload(); // used bcz we need id of LoggedAttendanceAllRecord func which is in useEffect
        console.log("Today CheckIn data", attendance);

        // console.log("AttendanceID For checkout", EmployeeCheckIn._id);
      });

    if (CheckIn > "09:10:00 AM") {
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

      fetch(`${process.env.REACT_APP_BASE_URL}/leave`, {
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

  //-------------------------------------------- Attendance Checkout---------------------------------------------------------------
  const employeecheckout = async () => {
    console.log("checkout", attendance?.CheckOut);
    if (attendance?.CheckOut === "") {
      const CheckIn = attendance?.CheckIn;
      // console.log("i am here attendance checkin spread", CheckIn);
      const CheckOut = new Date().toLocaleTimeString();
      const Breaks = [];
      const ID = attendance?._id;
      console.log("attendance id in checkout", ID);

      // console.log("Attendance id for CheckOut", ID);

      await axios
        .put(`${process.env.REACT_APP_BASE_URL}/attendance/addon/${ID}`, {
          CheckIn,
          CheckOut,
          Breaks,
        })
        .then((res) => {
          setEmployeeCheckOut(res?.data?.updatedAttendance);
          setDisableCheckout(true);
        });
      // console.log("Today CheckOut Data", EmployeeCheckOut);
    } else {
      window.alert("you have already Checked-Out");
    }
  };
  //-------------------------------------------- Attendance Checkout---------------------------------------------------------------

  //-------------------------------------------- Attendance Break---------------------------------------------------------------
  const employeebreak = async () => {
    let Breaks = attendance?.Breaks;
    const employ = attendance?._id;
    console.log("attendance id in break", attendance?._id);
    const CheckIn = attendance?.CheckIn;
    const CheckOut = "";

    if (attendance?.Breaks[Breaks.length - 1]?.end === "") {
      Breaks[Breaks.length - 1].end = new Date().toLocaleTimeString();
      console.log("Breaks/endTime", attendance?.Breaks[Breaks.length - 1]?.end);
    } else {
      const obj = {
        start: new Date().toLocaleTimeString(),
        end: "",
      };
      console.log("Breaks/startTime", obj.start);
      attendance?.Breaks.push(obj);
    }
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/attendance/addon/${employ}`, {
        CheckIn,
        Breaks,
        CheckOut,
      })

      .then((res) => {
        setObjects(res?.data?.updatedAttendance);
        console.log("Breaks Response", res);
        // console.log("Breaks", Breaks);
      });

    setShow(!show);
  };
  //-------------------------------------------- Attendance Break---------------------------------------------------------------
  // const attCheckIn = moment(attendance.CheckIn);
  // const attCheckOut = moment(attendance.CheckOut);
  // attCheckOut.diff(attCheckIn, "hours");
  // console.log("hjhgcgffsfgdfh", totalhour);
  var attCheckIn = moment.duration(attendance.CheckIn);
  var attCheckOut = moment.duration(attendance.CheckOut);
  var diff = attCheckOut.subtract(attCheckIn);
  diff.hours();
  // console.log("jdbsjbdjbajhbhbja", diff);
  diff.minutes();

  return (
    <>
      <div>
        <span>
          {date.toLocaleDateString()}
          <br />
          {date.toLocaleTimeString()}
        </span>
      </div>

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
            employeebreak(show);
          }}
        >
          {show ? "Break" : "Resume"}
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "2px",
          }}
        >
          <span>CheckIn: {attendance?.CheckIn}</span>
          <span>CheckOut: {attendance?.CheckOut}</span>
          <span>Total Hours : { }</span>
        </div>
      </div>
      <br />
    </>
  );
};

export default Clock;
