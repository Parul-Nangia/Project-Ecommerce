import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { Alert } from "antd";

const Clock = () => {
  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState([]);

  const [disable, setDisable] = React.useState(false);
  const [EmployeeCheckIn, setEmployeeCheckIn] = useState([]);
  const [EmployeeCheckOut, setEmployeeCheckOut] = useState([]);
  // console.log("attendance state", attendance[0].CheckIn)
  const [objects, setObjects] = useState({});
  const [show, setShow] = useState(true);

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
    var decoded = jwt_decode(token);

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/attendance/record/${decoded._id}`)
      .then((res) => {
        setAttendance(res?.data?.attendanceDataByID);

        // console.log("Checkin Type", typeof attendance[0].CheckIn);
        // console.log("attendance checkin", attendance.CheckIn);
      });
    console.log("Logged In Employee Attendance", attendance);
  };
  //---------------------------------------------Employee Attendance GET by id API----------------------------------------------------------

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

  //-------------------------------------------- Attendance Checkin---------------------------------------------------------------
  // const checkDate = new Date();
  // // console.log("Checkin Date", checkDate)
  // let day = checkDate.getDate();
  // let month = checkDate.getMonth() + 1;
  // let year = checkDate.getFullYear();
  // let currentDate = `${year}-${month}-${day}`;

  // const checkinConvert = new Date().toDateString();
  // const againcheckinConvert = new Date().toISOString();
  // console.log("Checkin Date Conversion", checkinConvert)
  // let day1 = checkinConvert.getDate();
  // let month1 = checkinConvert.getMonth() + 1;
  // let year1 = checkinConvert.getFullYear();
  // let currentDate1 = `${year1}-${month1}-${day1}`;

  // if (currentDate === currentDate) {
  //   const token = localStorage.getItem("access_token1");
  //   var decoded = jwt_decode(token);
  //   <Alert
  //     message={decoded.name}
  //     description="You have already Checked-in"
  //     type="warning"
  //     showIcon
  //     closable
  //   />;
  // }

  useEffect(() => {
    var MyDate = new Date();
    var MyDateString;
    MyDate.setDate(MyDate.getDate()); // date format "2022-10-02" with zero
    MyDateString =
      MyDate.getFullYear() +
      "-" +
      ("0" + (MyDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + MyDate.getDate()).slice(-2);

    if (attendance.TodayDate === MyDateString) {
      setDisable(true);
      // window.alert("You have already checkin")
    } else {
      employeecheckin();
    }
  }, []);

  const employeecheckin = async (e) => {
    e.preventDefault();
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
    const Breaks = "";
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

        // console.log("AttendanceID For checkout", EmployeeCheckIn._id);
      });
    console.log("Today Checkin Data", EmployeeCheckIn);

    if (attendance[0].CheckIn >= "09:10:00 AM") {
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
  useEffect(() => {
    employeecheckout();
  }, []);

  const employeecheckout = async () => {
    const CheckIn = attendance[0].CheckIn;
    console.log("i am here attendance checkin spread", CheckIn);
    const CheckOut = new Date();
    const Breaks = "";
    const ID = attendance[0]._id;
    console.log("Attendance id for CheckOut", ID);

    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/attendance/${ID}`, {
        CheckIn,
        CheckOut,
        Breaks,
      })
      .then((res) => {
        setEmployeeCheckOut(res?.data?.updatedAttendance);
      });
    console.log("Today CheckOut Data", EmployeeCheckOut);
  };
  //-------------------------------------------- Attendance Checkout---------------------------------------------------------------

  //-------------------------------------------- Attendance Break------------------------------------------------------------------

    const employeebreak = async (action) => {
    const start = new Date().toLocaleTimeString();
    const end = new Date().toLocaleTimeString();

    const obj = {
      start: start,
      
    };
    obj.start = start;
    if (!action) {
      obj.end = end;
    }

    const breaks = [];
    breaks.push(obj);
   

    const ID = attendance[0]._id;
    const CheckIn = attendance[0].CheckIn;
    const Breaks = breaks;
    const CheckOut = "";
    console.log("break", Breaks);


    Breaks.push(obj)

    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/attendance/${ID}`, {
        CheckIn,
        Breaks,
        CheckOut,
      })

      .then((res) => {
        setObjects(res?.data?.updatedAttendance);
        console.log("breakss", res);
      });

    setShow(!show);
  };


  //-------------------------------------------- Attendance Break----------------------------------------------------------------

  
    


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

      {/* {attendance?.CheckOut}
      {attendance?.Break}

      {attendance?.Resume} */}

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