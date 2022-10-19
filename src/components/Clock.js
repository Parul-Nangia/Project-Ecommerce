import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Clock = () => {
  const [date, setDate] = useState(new Date());
  // const [checkin,setCheckin]= useState(false)
  const [login, setLogin] = useState([]);

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

  const employeecheckin = async (emp_id) => {
    const token = localStorage.getItem("access_token1");
    console.log("token from local storage:", token)
    var decoded = jwt_decode(token);
    console.log("Decoded token data",decoded);
  

    
      const CheckIn = new Date();
      console.log("I am here Clock Date", CheckIn);
      const CheckOut = "";
      const Break = "";
      const Resume = "";



    await axios
      .get(`http://localhost:1999/attendance/${emp_id}`)
      .then((res) => {
        setLogin(res?.data?.attendanceRecord);
        console.log(login, "login");
      });

     await axios
      .post(`http://localhost:1999/attendance/${emp_id}`, {
        CheckIn,
        CheckOut,
        Break,
        Resume,
      })
      .then((res) => {
        console.log(emp_id, "jgj");
      })
    }

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

      {login?.emp_id}
      {login?.Date}
      {login?.CheckIn}
      {login?.CheckOut}
      {login?.Break}
      {login?.Resume}

      <div>
        <Button
          onClick={(emp_id) => {
            employeecheckin(emp_id);
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
