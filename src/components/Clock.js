import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Clock = () => {
  const [date, setDate] = useState(new Date());


  const [attendance, setAttendance] = useState([]);
  
  

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




//-------------------------------------------- Attendance Checkin---------------------------------------------------------------
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

        // console.log("attendance checkin", attendance.CheckIn);
      });

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    console.log(currentDate);

    if (attendance[1].CheckIn = currentDate) {
      alert("You have already checked in");
    } else {

      const CheckIn = new Date();
      console.log("I am here Clock Date", CheckIn);
      const name = decoded.name;
      const CheckOut = "";
      const Break = "";
      

      await axios
        .post(`http://localhost:1999/attendance/${decoded._id}`, {
          name,
          CheckIn,
          CheckOut,
          Break,
         
        })
        .then((res) => {
          console.log("attendance response", res);
        });
    }
  };
//-------------------------------------------- Attendance Checkin---------------------------------------------------------------




//-------------------------------------------- Attendance Checkout---------------------------------------------------------------
  const employeecheckout = async () => {
    const token = localStorage.getItem("access_token1");
    console.log("token from local storage:", token);
    var decoded = jwt_decode(token);
    console.log("Decoded token data", decoded);

    const CheckIn = "";
    const CheckOut = new Date();
    const Break = "";
    

    await axios
      .put(`http://localhost:1999/attendance/${decoded._id}`, {
        CheckIn,
        CheckOut,
        Break,
      
      })
      .then((res) => {
        console.log("id", decoded._id);

        console.log("employee check out", res);
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
    const Breaks = {
      start: "10.10",
      end: "10.30"
    };


    console.log("obj", Breaks);

    await axios
      .put(`http://localhost:1999/attendance/${decoded._id}`, {Breaks})

    var chkin = attendance?.CheckIn;
    console.log("checkin", chkin);

    const CheckIn = "";
    const CheckOut = "";
    const Break = new Date();

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
          onClick={() => {
            employeecheckin();
          }}
          
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
