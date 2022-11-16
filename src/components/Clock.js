import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { Alert } from "antd";
import moment from "moment";
import { Col, Row, Modal, Card, Input } from "antd";

const Clock = () => {
  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState([]);
  const [TodayAttendance, setTodayAttendance] = useState([]);
  const [disableCheckin, setDisableCheckin] = React.useState(false);
  const [disableCheckout, setDisableCheckout] = React.useState(false);
  const [disablebreak, setDisableBreak] = React.useState(false);
  const [EmployeeCheckIn, setEmployeeCheckIn] = useState([]);
  const [attendanceAll, setAttendanceAll] = useState([]);

  const [EmployeeCheckOut, setEmployeeCheckOut] = useState([]);
  const [attendancetime, setAttendanceTime] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimer, setIsTimer] = useState(false);

  // console.log("attendance state", attendance[0].CheckIn)
  const [objects, setObjects] = useState({});
  const [show, setShow] = useState();
  const [disableOk, setDisableOk] = React.useState(false);
  const { TextArea } = Input;
  // console.log("show?", show)

  //-------------------------------------------- Clock---------------------------------------------------------------
  // const showTimer = () => {
  //   setIsTimer(true);
  // };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    employeecheckout();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

          // Check if employee Checked-In Today
          if (res?.data?.attendanceDataByEmpID.length === 0) {
            setDisableCheckin(false);
          } else if (res?.data?.attendanceDataByEmpID[0].CheckIn !== "") {
            setDisableCheckin(true);
          }

          // Check if employee Checked-Out Today
          if (res?.data?.attendanceDataByEmpID.length === 0) {
            setDisableCheckout(false);
          } else if (res?.data?.attendanceDataByEmpID[0].CheckOut !== "") {
            setDisableCheckout(true);
          }

          // Check if employee Checked-In Today then he can take breaks. Otherwise Break button will remain disabled
          if (res?.data?.attendanceDataByEmpID.length === 0) {
            setDisableBreak(true)
          } else {
            setDisableBreak(false);
          }

          // Check if employee took Breaks Today
          if (res?.data?.attendanceDataByEmpID.length === 0) {
            setShow(true);
            console.log("You Havn't took any Breaks", show);
          }
          else if (
            res?.data?.attendanceDataByEmpID[0].Breaks[
              res?.data?.attendanceDataByEmpID[0].Breaks.length - 1
            ]?.start !== "" &&
            res?.data?.attendanceDataByEmpID[0].Breaks[
              res?.data?.attendanceDataByEmpID[0].Breaks.length - 1
            ]?.end === ""
          ) {
            setShow(false);
            console.log("Please Resume Your Break", show);
          }
          else if (
            res?.data?.attendanceDataByEmpID[0].Breaks[
              res?.data?.attendanceDataByEmpID[0].Breaks.length - 1
            ]?.start !== "" &&
            res?.data?.attendanceDataByEmpID[0].Breaks[
              res?.data?.attendanceDataByEmpID[0].Breaks.length - 1
            ]?.end !== ""
          ) {
            setShow(true);
            console.log("Click To take a Break", show);
          }
          else {
            setShow(true);
            console.log("nothing found");
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
        date.toLocaleTimeString();
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
        ReturnDate: MyDateString,
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
      const Breaks = attendance?.Breaks;
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
          window.location.reload();
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

  // useEffect(() => {
  //   // const timerId = setInterval(refreshClock, 1000);
  //   const timeAttendance = () => {
  //     const attCheckOut = moment(attendance?.CheckOut, "HH:mm:ss a");
  //     const attCheckIn = moment(attendance?.CheckIn, "HH:mm:ss a");
  //     const timeDifference = moment.duration(attCheckOut.diff(attCheckIn));
  //     // setAttendanceTime(timeDifference?.Duration?._data);
  //     setAttendanceTime(timeDifference?.Duration?.data);
  //     // console.log();
  //     console.log("Time Difference is here", timeDifference);
  //   };
  //   timeAttendance();
  // }, []);

  const attCheckIn = moment(attendance?.CheckIn, "HH:mm:ss a");
  const attCheckOut = moment(attendance?.CheckOut, "HH:mm:ss a");

  const milliSeconds = moment.duration(attCheckOut.diff(attCheckIn));
  // const seconds = Math.floor((milliSeconds / 1000) % 60);
  const minutes = Math.floor((milliSeconds / 1000 / 60) % 60);
  const hours = Math.floor((milliSeconds / 1000 / 60 / 60) % 24);

  const formatingTime = [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    // seconds.toString().padStart(2, "0"),
  ].join(":");

  // console.log("Formating time is here :", formatingTime);

  // console.log("Time Difference is here", timeDifference);
  //-------------------------------------------- Attendance Break---------------------------------------------------------------
  // const onFinish = (values) => {
  //   console.log('Success:', values);
  // };
  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };

  return (
    <>
      <div>
        <span>
          <br />
          {date.toLocaleDateString()}
          <br />
          {date.toLocaleTimeString()}
          <br />

          <Row gutter={16}>
            <Col span={8} className="TimeCards">
              <Card title="CheckIn " bordered={false}>
                {attendance?.CheckIn}
              </Card>
            </Col>
            <Col span={8} className="TimeCards">
              <Card title="CheckOut" bordered={false}>
                {attendance?.CheckOut}
              </Card>
            </Col>
            <Col span={8} className="TimeCards">
              <Card title="Total Hours" bordered={false}>
                {formatingTime} hours
              </Card>
            </Col>
          </Row>
        </span>
      </div>
      <br />

      <Modal
        title="E.O.D"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TextArea rows={10} />
      </Modal>

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
          disabled={disablebreak}
        >
          {show ? "Break" : "Resume"}
        </Button>

        <Button
          style={{
            color: "white",
            backgroundColor: "Orange",
            fontWeight: "Bold",
            // onClick={showModal},
          }}
          onClick={() => {
            showModal();
          }}
        // disabled={disableCheckout}
        >
          Checkout
        </Button>
      </div>
      <br />
    </>
  );
};

export default Clock;
