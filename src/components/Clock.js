import React, { useState, useEffect } from "react";
import { Button, Dropdown, Menu, Space, Select } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  MinusCircleOutlined,
  PlusOutlined,
  DownOutlined,
} from "@ant-design/icons";

import moment, { duration } from "moment";
import { Col, Row, Modal, Card, Input, Form } from "antd";

const Clock = () => {
  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState([]);
  const [TodayAttendance, setTodayAttendance] = useState([]);
  const [disableCheckin, setDisableCheckin] = React.useState(false);
  const [disableCheckout, setDisableCheckout] = React.useState(false);
  const [disablebreak, setDisableBreak] = React.useState(false);
  const [EmployeeCheckIn, setEmployeeCheckIn] = useState([]);
  const [attendanceAll, setAttendanceAll] = useState([]);
  let newTime = new Date().toLocaleTimeString();
  const [ctime, setCTime] = useState(newTime);

  const [eod, setEod] = useState("");
  // console.log("hiiiiiiiii", eod);

  const [timespent, setTimespent] = useState("");

  const [EmployeeCheckOut, setEmployeeCheckOut] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimer, setIsTimer] = useState(false);
  const [objects, setObjects] = useState({});
  const [show, setShow] = useState();

  //-------------------------------------------- Clock---------------------------------------------------------------

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showTimer = () => {
    setIsTimer(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
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
            setDisableBreak(true);
          } else {
            setDisableBreak(false);
          }

          // Check if employee took Breaks Today
          if (res?.data?.attendanceDataByEmpID.length === 0) {
            setShow(true);
            console.log("You Havn't took any Breaks", show);
          } else if (
            res?.data?.attendanceDataByEmpID[0].Breaks[
              res?.data?.attendanceDataByEmpID[0].Breaks.length - 1
            ]?.start !== "" &&
            res?.data?.attendanceDataByEmpID[0].Breaks[
              res?.data?.attendanceDataByEmpID[0].Breaks.length - 1
            ]?.end === ""
          ) {
            setShow(false);
            console.log("Please Resume Your Break", show);
          } else if (
            res?.data?.attendanceDataByEmpID[0].Breaks[
              res?.data?.attendanceDataByEmpID[0].Breaks.length - 1
            ]?.start !== "" &&
            res?.data?.attendanceDataByEmpID[0].Breaks[
              res?.data?.attendanceDataByEmpID[0].Breaks.length - 1
            ]?.end !== ""
          ) {
            setShow(true);
            console.log("Click To take a Break", show);
          } else {
            setShow(true);
            console.log("nothing found");
          }

          if (res?.data?.attendanceDataByEmpID.length === 0) {
            setTodayAttendance("00:00");
            console.log("1 am here", TodayAttendance);
          } else if (res?.data?.attendanceDataByEmpID[0]?.CheckIn === "") {
            setTodayAttendance("00:00");
            console.log("2 am here", TodayAttendance);
          } else if (res?.data?.attendanceDataByEmpID[0]?.CheckOut === "") {
            setTodayAttendance("00:00");
            console.log("3 am here", TodayAttendance);
          } else {
            const attCheckIn = moment(
              res?.data?.attendanceDataByEmpID[0].CheckIn,
              "HH:mm:ss a"
            );
            const attCheckOut = moment(
              res?.data?.attendanceDataByEmpID[0].CheckOut,
              "HH:mm:ss a"
            );
            const milliSeconds = moment.duration(attCheckOut.diff(attCheckIn));
            // const seconds = Math.floor((milliSeconds / 1000) % 60);
            const minutes = Math.floor((milliSeconds / 1000 / 60) % 60);
            const hours = Math.floor((milliSeconds / 1000 / 60 / 60) % 24);

            // if (minutes === 0 || hours === 0) {
            //   console.log("minutes", minutes);
            //   console.log("hours", hours);
            //   setTodayAttendance("00:00");

            // console.log("here in minutes", minutes);
            // } else {
            const formatingTime = [
              hours.toString().padStart(2, "0"),
              minutes.toString().padStart(2, "0"),
              // seconds.toString().padStart(2, "0"),
            ].join(":");
            setTodayAttendance(formatingTime);
            console.log("Form", formatingTime);
            console.log("finally total hours", TodayAttendance);
            // }
          }

          // if (res?.data?.attendanceDataByEmpID?.length === 0) {
          //   console.log("attendance null", res?.data?.attendanceDataByEmpID?.length)
          // } else if (res?.data?.attendanceDataByEmpID?.CheckIn === "") {
          //   console.log("CheckIn null")
          // } else if (res?.data?.attendanceDataByEmpID?.eodoftheday?.length === []) {

          //   attendance?.eodoftheday.push(ar)
          //   console.log("mystate", res?.data?.attendanceDataByEmpID?.eodoftheday)

          // }
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
    const eodoftheday = [];
    const emp_id = decoded._id;
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/attendance/${emp_id}`, {
        name: decoded.name,
        emp_id: decoded._id,
        TodayDate,
        CheckIn,
        CheckOut,
        Breaks,
        eodoftheday,
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
  // console.log("length of array", attendance?.eodoftheday);
  const employeecheckout = async () => {};
  //-------------------------------------------- Attendance Checkout---------------------------------------------------------------
  //-------------------------------------------- Attendance Break---------------------------------------------------------------

  const employeebreak = async () => {
    let Breaks = attendance?.Breaks;
    const employ = attendance?._id;
    var eodoftheday = [];
    console.log("attendance id in break", attendance?._id);
    const CheckIn = attendance?.CheckIn;
    const CheckOut = "";

    if (attendance?.Breaks[Breaks.length - 1]?.end === "") {
      Breaks[Breaks.length - 1].end = new Date().toLocaleTimeString();
      console.log("Breaks/endTime", attendance?.Breaks[Breaks.length - 1]?.end);
    } else {
      const obj = {
        _id: Math.floor(Math.random() * 9785874563463865),
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
        eodoftheday,
      })

      .then((res) => {
        setObjects(res?.data?.updatedAttendance);
        console.log("Breaks Response", res);
        // console.log("Breaks", Breaks);
      });

    setShow(!show);
  };
  //-------------------------------------------- Attendance Break---------------------------------------------------------------

  const handleTime = () => {
    newTime = new Date().toLocaleTimeString();
    setCTime(newTime);
  };

  setInterval(handleTime, 1000);

  const onFinish = async (value) => {
    console.log("Received values of form:", value);
    console.log("checkout", attendance?.CheckOut);

    if (attendance?.CheckOut === "") {
      const CheckIn = attendance?.CheckIn;
      // console.log("i am here attendance checkin spread", CheckIn);
      const CheckOut = new Date().toLocaleTimeString();
      const Breaks = attendance?.Breaks;
      const eodoftheday = value.users;
      console.log("eodoftheday", eodoftheday);

      const ID = attendance?._id;
      console.log("attendance id in checkout", ID);

      await axios
        .put(`${process.env.REACT_APP_BASE_URL}/attendance/addon/${ID}`, {
          CheckIn,
          CheckOut,
          Breaks,
          eodoftheday,
        })
        .then((res) => {
          setEmployeeCheckOut(res?.data?.updatedAttendance);
          setDisableCheckout(true);
          window.location.reload();
        });
    } else {
      window.alert("you have already Checked-Out");
    }
  };
  // console.log("mystate", mystate)

  return (
    <>
      <div>
        <span>
          <br />
          <h3>DATE</h3>
          {date.toLocaleDateString()}
          <br />
          <br />
          <h1>TIME</h1>
          {ctime}
          <br />
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
                {TodayAttendance} hours
              </Card>
            </Col>
          </Row>
        </span>
      </div>

      <br />

      <Modal
        title="E.O.D"
        open={isModalOpen}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      style={{ width: "160%" }}
                      {...restField}
                      name={[name, "eod"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing eod",
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => {
                          setEod(e.target.value);
                        }}
                        placeholder="EOD"
                      />
                    </Form.Item>
                    <Form.Item
                      style={{ marginLeft: "160px" }}
                      {...restField}
                      name={[name, "time spent"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing time spent",
                        },
                      ]}
                    >
                      <Select
                        style={{
                          display: "flex",
                          width: "100px",
                        }}
                        onChange={(e) => {
                          setTimespent(e.target.value);
                        }}
                        placeholder="Time"
                        options={[
                          {
                            value: "10 min",
                            label: "10 MIN",
                          },
                          {
                            value: "20 min",
                            label: "20 MIN",
                          },
                          {
                            value: "disable",
                            disabled: true,
                            label: "30 MIN",
                          },
                          {
                            value: "40 min",
                            label: "40 MIN",
                          },
                          {
                            value: "50 min",
                            label: "50 MIN",
                          },
                          {
                            value: "1 hour",
                            label: "1 Hour",
                          },
                          {
                            value: "2 hour",

                            label: "2 Hour",
                          },
                          {
                            value: "3 hour",
                            label: "3 Hour",
                          },
                          {
                            value: "4 hour",
                            label: "4 Hour",
                          },
                          {
                            value: "5 hour",

                            label: "5 Hour",
                          },
                          {
                            value: "6 hour",
                            label: "6 Hour",
                          },
                          {
                            value: "7 hour",

                            label: "7 Hour",
                          },
                          {
                            value: "8 hour",
                            label: "8 Hour",
                          },
                        ]}
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Your Work
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button
              style={{ display: "flex", marginLeft: "43%" }}
              type="primary"
              htmlType="submit"
              onClick={handleOk}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div>
        <Button
          type="primary"
          ghost
          style={{ fontWeight: "bold", background: "#D3D3D3" }}
          onClick={() => {
            handleTime();
            employeecheckin();
          }}
          disabled={disableCheckin}
        >
          Checkin
        </Button>
        <Button
          style={{ fontWeight: "bold", background: "#D3D3D3" }}
          type="break"
          ghost
          onClick={() => {
            employeebreak();
          }}
          disabled={disablebreak}
        >
          {show ? "Break" : "Resume"}
        </Button>

        <Button
          type="checkout"
          style={{ fontWeight: "bold", background: "#D3D3D3" }}
          ghost
          onClick={() => {
            showModal();
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

// const employeeEOD = async () => {
//   if (attendance?.CheckOut === "") {
//     const CheckIn = attendance?.CheckIn;
//     // console.log("i am here attendance checkin spread", CheckIn);
//     const CheckOut = new Date().toLocaleTimeString();
//     const Breaks = attendance?.Breaks;
//     const ID = attendance?._id;
//     const eod = "";
//     const timeSpend = "";
//     console.log("attendance id in checkout", ID);

//     // console.log("Attendance id for CheckOut", ID);

//     await axios
//       .put(`${process.env.REACT_APP_BASE_URL}/attendance/addon/${ID}`, {
//         CheckIn,
//         CheckOut,
//         Breaks,
//         eod,
//         timespend,
//       })
//       .then((res) => {
//         setEmployeeEod(res?.data?.updatedAttendance);
//         console.log("jkdsbhsnvnbsdbdc", res);
//         setDisableCheckout(true);
//         window.location.reload();
//       });
//     console.log("Today EOD data", employeeeod);
//   } else {
//     window.alert("you have already Checked-Out");
//   }
// };
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

// const attCheckIn = moment(attendance?.CheckIn, "HH:mm:ss a");
// const attCheckOut = moment(attendance?.CheckOut, "HH:mm:ss a");

// const milliSeconds = moment.duration(attCheckOut.diff(attCheckIn));
// // const seconds = Math.floor((milliSeconds / 1000) % 60);
// const minutes = Math.floor((milliSeconds / 1000 / 60) % 60);
// const hours = Math.floor((milliSeconds / 1000 / 60 / 60) % 24);

// const formatingTime = [
//   hours.toString().padStart(2, "0"),
//   minutes.toString().padStart(2, "0"),
//   // seconds.toString().padStart(2, "0"),
// ].join(":");
// setNewTime(formatingTime);
// console.log("jhvashdvhjvdhvsdhj", formatingTime);

// if (
//   attendance !== [] ||
//   attendance?.CheckIn !== "" ||
//   attendance?.CheckOut !== ""
// ) {
// } else {
//   const attCheckIn = moment(attendance?.CheckIn, "HH:mm:ss a");
//   const attCheckOut = moment(attendance?.CheckOut, "HH:mm:ss a");

//   const milliSeconds = moment.duration(attCheckOut.diff(attCheckIn));
//   // const seconds = Math.floor((milliSeconds / 1000) % 60);
//   const minutes = Math.floor((milliSeconds / 1000 / 60) % 60);
//   const hours = Math.floor((milliSeconds / 1000 / 60 / 60) % 24);

//   const formatingTime = [
//     hours.toString().padStart(2, "0"),
//     minutes.toString().padStart(2, "0"),
//     // seconds.toString().padStart(2, "0"),
//   ].join(":");
//   setNewTime(formatingTime);
//   console.log("formating", newtime);
//   console.log("jhvashdvhjvdhvsdhj", formatingTime);
// }

// function getFormating(formatingTime) {
//   if (isNaN(formatingTime)) {
//     return 0;
//   }
//   return formatingTime;
// }

// formatingTime.replace(NaN, "0");y

// if (attendance?.CheckOut === "") {
//   {
//     formatingTime;
//   }
// } else {
//   ("00.00");
// }

// console.log("Formating time is here :", formatingTime);

// console.log("Time Difference is here", timeDifference);
//-------------------------------------------- Attendance Break---------------------------------------------------------------
// const onFinish = (values) => {
//   console.log('Success:', values);
// };
// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };
