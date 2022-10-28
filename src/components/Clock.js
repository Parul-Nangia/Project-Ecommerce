import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Clock = () => {
  const [date, setDate] = useState(new Date());

  const [attendance, setAttendance] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  // const[show,setShow]=useState(false)

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
        console.log("attendance checkin", attendance?.CheckIn);
      });

    if (attendance?.CheckIn == new Date()) {
      alert("You have already checked in");
    } else {
      const CheckIn = new Date();
      console.log("I am here Clock Date", CheckIn);
      const CheckOut = "";
      const Break = "";

      const emp_id = decoded._id;

      await axios
        .post(`http://localhost:1999/attendance/${decoded._id}`, {
          emp_id,
          CheckIn,
          CheckOut,
          Break,
        })
        .then((res) => {
          console.log("attendance response", res);
        });
    }
  };

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

  //  const Breaks = Object.create({
  //   Start:"",
  //   End:""

  // })

  // const break = () =>{
  //   Break
  // }

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

    // const breakData = Breaks
    //  breakData.append("starttime",start)
    //  breakData.append("endtime",end)

    console.log("obj", Breaks);

    await axios
      .put(`http://localhost:1999/attendance/${decoded._id}`, {Breaks})
      .then((res) => {
        console.log("employee break", res);
      });
  };

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
      {attendance?.CheckIn}
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
