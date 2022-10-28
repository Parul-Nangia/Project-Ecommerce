import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";

const AttendanceTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [state, setState] = useState([]);
  console.log("atten rec",dataSource)
  // const [attendancedata, setAttendanceData] = useState([]);

  // useEffect(() => {
  //   employeetime();
  // }, []);

  // const employeetime = (emp_id) => {
  //   fetch(`http://localhost:1999/attendance/emp_id`)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       let emptime = data.attendanceRecord;
  //       setAttendanceData(emptime);
  //       console.log("response", emptime);

  //     });
  // };
  // console.log(attendancedata, "hh")
  // useEffect(() => {
  //   attendancelist();
  // }, []);

  // const attendancelist = () => {
  //   fetch("http://localhost:1999/attendance")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       let emp = data.userData;
  //       setState(emp);

  //       console.log("response", emp);
  //     });
  // };
  // console.log(state, "hh");
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get("http://localhost:1999/attendance").then((res) => {
      console.log(res, "bhvhv");
      setDataSource(res?.data?.attendanceRecord);
      console.log("attendance record",dataSource);
    });
  };

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "name",
    },
    {
      title: "CheckIn Time",
      dataIndex: "CheckIn",
    },
    {
      title: "CheckOut Time",
      dataIndex: "CheckOut",
    },
    {
      title: "Break",
      dataIndex: "Break",
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

export default AttendanceTable;
